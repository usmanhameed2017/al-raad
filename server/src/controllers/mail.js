const Mail = require("../models/mail");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const { isValidObjectId } = require("mongoose");
const sendEmail = require("../service/mailer");
const fs = require("fs");
const path = require("path");

// Send mail
const sendMail = async (request, response) => {
    try 
    {
        request.body.name = request.user?.name;
        request.body.email = request.user?.email;
        request.body.mailedBy = request.user?._id;
        const mail = await Mail.create(request.body);

        // Get HTML template
        const html = fs.readFileSync(path.resolve(__dirname, "../../public/contactus.html"), "utf-8");

        // Replace placeholders
        const filledHtml = html
        .replaceAll('{{name}}', mail?.name)
        .replaceAll('{{email}}', mail?.email)
        .replaceAll('{{subject}}', mail?.subject)
        .replaceAll('{{message}}', mail?.message);

        // Send mail
        const result = await sendEmail("usmanhameed1790@gmail.com", `📬 Contact us - ${mail?.subject}`, filledHtml);      
        if(!result) throw new ApiError(500, "Unable to send email");        
        return response.status(201).json(new ApiResponse(201, mail, "Email has been sent successfully"));
    } 
    catch (error) 
    {
        throw new ApiError(500, error.message);
    }
};

// Reply to user's mail
const replyToUser = async (request, response) => {
    const { email, subject, message } = request.body;
    try 
    {
        // Get HTML template
        const html = fs.readFileSync(path.resolve(__dirname, "../../public/mailReply.html"), "utf-8");

        // Replace placeholders
        const filledHtml = html.replaceAll('{{message}}', message);

        // Send mail
        const result = await sendEmail(email, subject, filledHtml);      
        if(!result) throw new ApiError(500, "Unable to send email");         
        return response.status(201).json(new ApiResponse(200, null, "Email has been sent successfully"));        
    } 
    catch (error) 
    {
        throw new ApiError(500, error.message);
    }
};

// Fetch all mails
const fetchMails = async (request, response) => {
    const { page = 1, limit = 10, search = "" } = request.query;

    // Paging options
    const options = {
        page:parseInt(page),
        limit:parseInt(limit),
        sort: { createdAt: -1 },
        populate: { path:"mailedBy", select:"name" }
    };    

    try 
    {
        let query = {};

        // If search keyword provided
        if (search && search.trim() !== "") 
        {
            query = {
                $or: [
                    { name: { $regex: search.trim(), $options: "i" } },
                    { subject: { $regex: search.trim(), $options: "i" } }
                ]
            };
        }

        // Execute query
        const result = await Mail.paginate(query, options);

        // If page size is greater than total pages
        if(page > result.totalPages) throw new ApiError(404, "Mail not found");

        return response.status(200).json(new ApiResponse(200, result, "All mails has been fetched successfully"));        
    } 
    catch (error) 
    {
        throw new ApiError(404, error.message);
    }
};

// Fetch single mail
const fetchSingleMail = async (request, response) => {
    const id = request.params?.id || null;
    if(!id) throw new ApiError(404, "Mail ID is missing");
    if(!isValidObjectId(id)) throw new ApiError(400, "Invalid mongodb ID");

    try 
    {
        const mail = await Mail.findById(id);
        if(!mail) throw new ApiError(404, "Mail not found");
        return response.status(200).json(new ApiResponse(200, mail, "Mail has been fetched successfully"));
    }
    catch(error) 
    {
        throw new ApiError(500, error.message);
    }
};

// Delete mail
const deleteMail = async (request, response) => {
    const id = request.params?.id || null;
    if(!id) throw new ApiError(404, "Mail ID is missing");
    if(!isValidObjectId(id)) throw new ApiError(400, "Invalid mongodb ID");

    try 
    {
        const mail = await Mail.findByIdAndDelete(id);
        if(!mail) throw new ApiError(404, "Mail not found");
        return response.status(200).json(new ApiResponse(200, mail, "Mail has been deleted successfully"));
    }
    catch(error) 
    {
        throw new ApiError(500, error.message);
    }
};

module.exports = { sendMail, replyToUser, fetchMails, fetchSingleMail, deleteMail };