const User = require("../models/user");
const sendEmail = require("../service/mailer");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const fs = require("fs");
const path = require("path");
const generateCode = require("../utils/generateCode");
const bcrypt = require("bcrypt");

// Security Step-01 (Forgot Password)
const forgotPassword = async (request, response) => {
    try 
    {
        // Validate email
        const email = request.body?.email || null;
        if(!email) throw new ApiError(400, "Email is required");

        // Get user
        const user = await User.findOne({ email }).select("name email");
        if(!user) throw new ApiError(404, "User not found associated with this email address");

        // Generate verification code & expiry time
        const { code:resetCode, expiresAt:resetCodeExpiresAt } = generateCode(15);

        // Hash the reset code before saving into database
        const hashedCode = await bcrypt.hash(resetCode, 10);
        if(!hashedCode) throw new ApiError(500, "Failed to hash reset code! Try again after a while");

        // Update reset code
        const updateUser = await User.findByIdAndUpdate(user?._id, { resetCode: hashedCode, resetCodeExpiresAt }, { new:true }).select("-password");
        if(!updateUser) throw new ApiError(404, "User not found");

        // Get HTML template
        const html = fs.readFileSync(path.resolve(__dirname, "../../public/forgotPassword.html"), "utf-8");

        // Replace placeholders
        const filledHtml = html
        .replace('{{name}}', user?.name || "User")
        .replace('{{resetCode}}', resetCode);

        // Send email
        const result = await sendEmail(email, "Reset Your Password", filledHtml);
        if(!result) throw new ApiError(400, "Unable to send email"); 

        return response.status(200)
        .json(new ApiResponse(200, { _id:user?._id }, `We have sent you a reset code at your email ${email}`));
    } 
    catch(error) 
    {
        throw error;
    }
};

// Security Step-02 (Verify Reset Code)
const verifyResetCode = async (request, response) => {
    try 
    {
        // Validate reset code
        const { resetCode = null, _id = null } = request.body || {};
        if(!resetCode) throw new ApiError(400, "Reset code is required");

        // Get user
        const user = await User.findById(_id).select("resetCode resetCodeExpiresAt");
        if(!user) throw new ApiError(404, "User not found associated with the state ID");

        // Compare reset code
        const isValid = await bcrypt.compare(resetCode, user?.resetCode);
        if(!isValid) throw new ApiError(400, "Invalid reset code");

        // Check reset code expiry
        if(user?.resetCodeExpiresAt < Date.now()) throw new ApiError(400, "Reset code has expired");

        // Update reset code and expiry time
        const updateUser = await User.findByIdAndUpdate(user?._id, { resetCode:null, resetCodeExpiresAt:null });
        if(!updateUser) throw new ApiError(404, "User not found");

        return response.status(200).json(new ApiResponse(200, null, "Reset code has been verified! Please reset your password"));
    } 
    catch(error) 
    {
        throw error;
    }
};

// Security Step-03 (Reset Password)
const resetPassword = async (request, response) => {
    try 
    {
        const { _id, password, cpassword } = request.body || {};

        // Sanitize and validate required fields
        if(!_id) throw new ApiError(400, "State ID is missing");
        if(!password.trim()) throw new ApiError(400, "Password is required");
        if(!cpassword.trim()) throw new ApiError(400, "Confirm password is required");
        if(password !== cpassword) throw new ApiError(400, "Password and confirm password must be identical");

        // Get user
        const user = await User.findById(_id);
        if(!user) throw new ApiError(404, "User not found associated with the state ID");

        // Prevent user from reusing the same password
        const isMatched = await user.matchPassword(password);
        if(isMatched) throw new ApiError(400, "New password cannot be the same as your current password");

        user.password = password;
        await user.save(); // Save to trigger password hashing
        return response.status(200).json(new ApiResponse(200, null, "You have successfully reset your password"));
    } 
    catch(error) 
    {
        throw error;
    }
};

module.exports = { forgotPassword, verifyResetCode, resetPassword };