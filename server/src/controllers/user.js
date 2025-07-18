const User = require("../models/user");
const sendEmail = require("../service/mailer");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const { isValidObjectId } = require("mongoose");
const shortid = require("shortid");
const fs = require("fs");
const path = require("path");
const { generateAccessToken } = require("../utils/auth");
const { cookieOptions } = require("../config");

// User signup
const signup = async (request, response) => {
    const { name, email, username, password, cpassword } = request.body;
    if([name, email, username, password, cpassword].some(field => !field?.trim())) throw new ApiError(400, "All fields are required");

    if(password !== cpassword) throw new ApiError(400, "Password & confirm password must be identical");

    const user = await User.getUser(email, username);
    if(user)
    {
        if(user.status === "Approved" || user.status === "Banned") throw new ApiError(400, "The email or username you entered is already exist.");

        // Resend code
        if(user.status === "Pending")
        {
            // Generate verification code
            const activationCode = shortid.generate();

            // Update verification code
            const updateUser = await User.findByIdAndUpdate(user?._id, { activationCode }, { new:true }).select("-password");

            // Get HTML template
            const html = fs.readFileSync(path.resolve(__dirname, "../../public/accountActivation.html"), "utf-8");

            // Replace placeholders
            const filledHtml = html
            .replace('{{name}}', name)
            .replace('{{activationCode}}', activationCode);
            const result = await sendEmail(email, "Account Activation", filledHtml);
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
    if(!activationCode.trim()) throw new ApiError(400, "Activation code is required");

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

// User login
const login = async (request, response) => {
    const { email="", username, password } = request.body;
    if([username, password].some(field => !field?.trim())) throw new ApiError(400, "All fields are required!");

    // Find user
    const user = await User.getUser(email, username);
    if(!user) throw new ApiError(404, "User not found associated with this username");

    // Match password
    const isMatched = await user.matchPassword(password);
    if(!isMatched) throw new ApiError(400, "Incorrect password");

    // Check status
    if(user?.status === "Pending") throw new ApiError(400, "Your account approval is in process. We'll notify you via email once it's activated");
    if(user?.status === "Banned") throw new ApiError(400, "Your account has been banned and cannot be accessed.");    

    // Generate access token
    const accessToken = generateAccessToken(user);
    if(!accessToken) throw new ApiError(400, "Failed to generate access token");

    try 
    {
        // Get user specific details
        const userData = await User.findById(user?._id).select("-password -status -activationCode");
        if(!userData) throw new ApiError(400, "Invalid user ID");
        return response.status(200)
        .cookie("accessToken", accessToken, cookieOptions)
        .json(new ApiResponse(200, userData, "Login successful"));
    } 
    catch(error) 
    {
        throw new ApiError(500, error.message);
    }
};

// Verify access token
const verifyAccessToken = async (request, response) => {
    if(!request.user) throw new ApiError(401, "Unauthenticated");
    return response.status(200).json(new ApiResponse(200, request.user, "Authenticated"));
};

// Fetch users
const fetchUsers = async (request, response) => {
    const { page = 1, limit = 10 } = request.query;

    // Paging options
    const options = {
        page:parseInt(page),
        limit:parseInt(limit),
        sort: { createdAt: -1 },
        select: '-password -activationCode'
    };

    try 
    {
        // Execute query
        const result = await User.paginate({}, options);

        // If page size is greater than total pages
        if(page > result.totalPages) throw new ApiError(404, "User not found");

        return response.status(200).json(new ApiResponse(200, result, "All users has been fetched successfully"));
    } 
    catch(error) 
    {
        throw new ApiError(404, error.message);
    }
};

// Fetch single user
const fetchSingleUser = async (request, response) => {
    const id = request.params?.id;
    if(!id) throw new ApiError(404, "User ID is missing");
    if(!isValidObjectId(id)) throw new ApiError(400, "Invalid MongoDB ID");

    try 
    {
        const user = await User.findById(id).select("-password -activationCode");
        if(!user) throw new ApiError(404, "User not found");
        return response.status(200).json(new ApiResponse(200, user, "User has been fetched successfully"));
    } 
    catch (error) 
    {
        throw new ApiError(404, error.message);
    }
};

// Edit user
const editUser = async (request, response) => {
    const id = request.params?.id;
    if(!id) throw new ApiError(404, "User ID is missing");
    if(!isValidObjectId(id)) throw new ApiError(400, "Invalid MongoDB ID");

    try 
    {
        const user = await User.findByIdAndUpdate(id, request.body, { new:true }).select("-password -activationCode");
        if(!user) throw new ApiError(404, "User not found");
        return response.status(200).json(new ApiResponse(200, user, "User has been updated successfully"));
    } 
    catch (error) 
    {
        throw new ApiError(404, error.message);
    }
};

// Delete user
const deleteUser = async (request, response) => {
    const id = request.params?.id;
    if(!id) throw new ApiError(404, "User ID is missing");
    if(!isValidObjectId(id)) throw new ApiError(400, "Invalid MongoDB ID");

    try 
    {
        const user = await User.findByIdAndDelete(id).select("-password -activationCode");
        if(!user) throw new ApiError(404, "User not found");
        return response.status(200).json(new ApiResponse(200, user, "User has been deleted successfully"));
    } 
    catch (error) 
    {
        throw new ApiError(404, error.message);
    }
};

// User logout
const logout = async (request, response) => {
    request.user = null;
    return response.status(200).clearCookie("accessToken", cookieOptions)
    .json(new ApiResponse(200, null, "Logout successfully"));
};

module.exports = { signup, accountActivation, login, verifyAccessToken, fetchUsers, fetchSingleUser, editUser, deleteUser, logout };