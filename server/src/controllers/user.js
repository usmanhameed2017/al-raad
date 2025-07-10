const User = require("../models/user");
const sendEmail = require("../service/mailer");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const shortid = require("shortid");
const fs = require("fs");
const path = require("path");

// User signup
const signup = async (request, response) => {
    const { name, email, username, password, cpassword } = request.body;
    if([name, email, username, password, cpassword].some(field => field === "")) throw new ApiError(400, "All fields are required");

    if(password !== cpassword) throw new ApiError(400, "Password & confirm password must be identical");

    const user = await User.getUser(email, username);
    if(user)
    {
        if(user.status === "Approved") throw new ApiError(400, "The email or username you entered is already exist.");

        // Resend code
        if(user.status === "Pending")
        {
            // Generate verification code
            const activationCode = shortid.generate();

            // Update verification code
            const updateUser = await User.findByIdAndUpdate(user?._id, { activationCode }, { new:true }).select("-password");

            // Send email
            const result = sendEmail(email, "Account Activation", `Your account activation code is ${activationCode}`);
            if(!result) throw new ApiError(500, "Unable to send email"); 

            return response.status(200)
            .json(new ApiResponse(200, updateUser, `We have sent you a verification code at your email ${email}`))
        }
    }
    
    try 
    {
        // Generate verification code
        const activationCode = shortid.generate();
        request.body.activationCode = activationCode;

        // Create user
        const createUser = await User.create(request.body);
        const userData = createUser.toObject();
        delete userData.password; // Exclude password

        // Get HTML template
        const html = fs.readFileSync(path.resolve(__dirname, "../../public/accountActivation.html"), "utf-8");

        // Replace placeholders
        const filledHtml = html
        .replace('{{name}}', name)
        .replace('{{activationCode}}', activationCode);

        // Send mail
        const result = await sendEmail(email, "Account Activation", filledHtml);      

        // Send email
        // const result = sendEmail(email, "Account Activation", `Your account activation code is ${activationCode}`);
        if(!result) throw new ApiError(500, "Unable to send email");

        return response.status(201)
        .json(new ApiResponse(201, userData, `Account has been created! We have sent you a verification code at your email ${email}`));
    } 
    catch (error) 
    {
        throw new ApiError(500, error.message);
    }
};

// Account activation
const accountActivation = async (request, response) => {
    const { activationCode } = request.body;
    if(activationCode.trim() === "") throw new ApiError(400, "Activation code is required");

    try 
    {
       const user = await User.findOneAndUpdate({ activationCode }, { status:"Approved" }, { new:true }).select("-password");
       if(!user) throw new ApiError(404, "Invalid activation code");

       return response.status(200).json(new ApiResponse(200, user, "Your account has been activated successfully!"));
    } 
    catch (error) 
    {
        throw new ApiError(500, error.message);
    }
};

module.exports = { signup, accountActivation };