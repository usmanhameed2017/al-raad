const User = require("../models/user");
const sendEmail = require("../service/mailer");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const { isValidObjectId } = require("mongoose");
const fs = require("fs");
const path = require("path");
const { generateAccessToken } = require("../utils/auth");
const { cookieOptions } = require("../config");
const generateCode = require("../utils/generateCode");

// Generate CSRF Token
const generateCsrfToken = async (request, response) => {
    return response.status(200)
    .json(new ApiResponse(200, request.csrfToken(), "CSRF Token has been generated successfully"));
};

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
            try 
            {
                // Re-generate verification code & new expiry time
                const { code:activationCode, expiresAt:activationCodeExpiresAt } = generateCode(10);

                // Update verification code and set new expiry time
                const updateUser = await User.findByIdAndUpdate(user?._id, { activationCode, activationCodeExpiresAt }, { new:true }).select("-password");

                // Get HTML template
                const html = fs.readFileSync(path.resolve(__dirname, "../../public/accountActivation.html"), "utf-8");

                // Replace placeholders
                const filledHtml = html
                .replace('{{name}}', name)
                .replace('{{activationCode}}', activationCode);
                const result = await sendEmail(email, "Account Activation", filledHtml);
                if(!result) throw new ApiError(400, "Unable to send email"); 

                return response.status(200)
                .json(new ApiResponse(200, updateUser, `We have sent you a verification code at your email ${email}`));
            } 
            catch(error)
            {
                throw error;
            }
        }
    }
    
    try 
    {
        // Generate verification code & expiry time
        const { code:activationCode, expiresAt:activationCodeExpiresAt } = generateCode(10);

        request.body.activationCode = activationCode;
        request.body.activationCodeExpiresAt = activationCodeExpiresAt;

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
        if(!result) throw new ApiError(400, "Unable to send email");

        return response.status(201)
        .json(new ApiResponse(201, userData, `Account has been created! We have sent you a verification code at your email ${email}`));
    } 
    catch(error)
    {
        throw error;
    }
};

// Account activation
const accountActivation = async (request, response) => {
    const { activationCode } = request.body;
    if(!activationCode.trim()) throw new ApiError(400, "Activation code is required");

    try 
    {
        // Check if activation code is exist
        const user = await User.findOne({ activationCode });
        if(!user) throw new ApiError(404, "Invalid activation code");

        // Check activation code expiry
        if (user?.activationCodeExpiresAt < Date.now()) throw new ApiError(400, "Activation code has expired");

        // Get user ip
        const ip = request.headers["x-forwarded-for"] || request.ip || null;
        const updateUser = await User.findByIdAndUpdate(user?._id, 
        { status:"Approved", ip:ip, activationCode:null, activationCodeExpiresAt:null }, { new:true }).select("-password");
        if(!updateUser) throw new ApiError(404, "Invalid activation code");

        return response.status(200).json(new ApiResponse(200, updateUser, "Your account has been activated successfully!"));
    } 
    catch(error)
    {
        throw error;
    }
};

// User login
const login = async (request, response) => {
    const { email = "", username, password } = request.body;
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
        const userData = await User.findById(user?._id)
        .select("-password -status -activationCode -activationCodeExpiresAt -resetCode -resetCodeExpiresAt -status -ip");
        if(!userData) throw new ApiError(400, "Invalid user ID");

        return response.status(200)
        .cookie("accessToken", accessToken, cookieOptions)
        .json(new ApiResponse(200, userData, "Login successful"));
    } 
    catch(error) 
    {
        throw error;
    }
};

// Admin login
const adminLogin = async (request, response) => {
    const { email = "", username, password } = request.body;
    if([username, password].some(field => !field?.trim())) throw new ApiError(400, "All fields are required!");

    // Find admin
    const user = await User.getUser(email, username);
    if(!user) throw new ApiError(404, "User not found associated with this username");

    // Only admin can login
    if(user?.role !== "Admin") throw new ApiError(404, "User not found associated with this username");

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
        const userData = await User.findById(user?._id)
        .select("-password -status -activationCode -activationCodeExpiresAt -resetCode -resetCodeExpiresAt -status -ip");
        if(!userData) throw new ApiError(400, "Invalid user ID");

        return response.status(200)
        .cookie("accessToken", accessToken, cookieOptions)
        .json(new ApiResponse(200, userData, "Login successful"));
    } 
    catch(error) 
    {
        throw error;
    }
};

// Verify access token
const verifyAccessToken = async (request, response) => {
    if(!request.user) throw new ApiError(401, "Unauthenticated");
    return response.status(200).json(new ApiResponse(200, request.user, "Authenticated"));
};

// Create user (Created by admin)
const createUser = async (request, response) => {
    const { name, email, username, role, password, cpassword } = request.body;
    if([name, email, username, role, password, cpassword].some(field => !field?.trim())) throw new ApiError(400, "All fields are required");
    if(password !== cpassword) throw new ApiError(400, "Password & confirm password must be identical");

    const user = await User.getUser(email, username);
    if(user) throw new ApiError(400, "The email or username you entered is already exist.");
    request.body.status = "Approved";

    try 
    {
        // Create user
        const createUser = await User.create(request.body);
        const userData = createUser.toObject();
        delete userData.password; // Exclude password
        return response.status(201).json(new ApiResponse(201, userData, `User has been created successfully`));
    } 
    catch(error)
    {
        throw error;
    }
};

// Fetch users
const fetchUsers = async (request, response) => {
    const { page = 1, limit = 10, search = "" } = request.query;

    // Paging options
    const options = {
        page:parseInt(page),
        limit:parseInt(limit),
        sort: { createdAt: -1 },
        select: '-password -activationCode'
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
                    { username: { $regex: search.trim(), $options: "i" } }
                ]
            };
        }

        // Execute query
        const result = await User.paginate(query, options);

        // If page size is greater than total pages
        if(page > result.totalPages) throw new ApiError(404, "User not found");

        return response.status(200).json(new ApiResponse(200, result, "All users has been fetched successfully"));
    } 
    catch(error) 
    {
        throw error;
    }
};

// Fetch single user
const fetchSingleUser = async (request, response) => {
    const id = request.params?.id || request.user?._id || "";
    if(!id) throw new ApiError(404, "User ID is missing");
    if(!isValidObjectId(id)) throw new ApiError(400, "Invalid MongoDB ID");

    try 
    {
        const user = await User.findById(id).select("-password -activationCode");
        if(!user) throw new ApiError(404, "User not found");
        return response.status(200).json(new ApiResponse(200, user, "User has been fetched successfully"));
    } 
    catch(error)
    {
        throw error;
    }
};

// Edit user
const editUser = async (request, response) => {
    const id = request.params?.id || request.user?._id || "";
    if(!id) throw new ApiError(404, "User ID is missing");
    if(!isValidObjectId(id)) throw new ApiError(400, "Invalid MongoDB ID");

    try 
    {
        const user = await User.findById(id).select("-password -activationCode");
        if(!user) throw new ApiError(404, "User not found");

        // Update only the fields sent
        Object.keys(request.body).forEach((key) => {
            user[key] = request.body[key];
        });

        // Save to trigger password hashing
        await user.save();

        // Exclude password field
        const userData = user.toObject();
        delete userData.password;    

        // Self modification
        if(!request.params?.id) 
        {
            // Generate new access token
            const accessToken = generateAccessToken(user);
            if(!accessToken) throw new ApiError(400, "Failed to generate new access token");        

            return response.status(200)
            .cookie("accessToken", accessToken, cookieOptions)
            .json(new ApiResponse(200, userData, "Your info has been updated successfully"));
        }

        // Admin updating another user
        return response.status(200).json(new ApiResponse(200, userData, "User has been updated successfully"));
    } 
    catch(error)
    {
        throw error;
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
    catch(error)
    {
        throw error;
    }
};

// User logout
const logout = async (request, response) => {
    request.user = null;
    return response.status(200).clearCookie("accessToken", cookieOptions)
    .json(new ApiResponse(200, null, "Logout successfully"));
};

module.exports = { 
    generateCsrfToken,
    signup,
    accountActivation,
    login,
    adminLogin,
    verifyAccessToken,
    createUser,
    fetchUsers, 
    fetchSingleUser,
    editUser,
    deleteUser,
    logout
};