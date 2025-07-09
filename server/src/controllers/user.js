const User = require("../models/user");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");

// Add create user
const signup = async (request, response) => {
    const { email, username, password, cpassword } = request.body;
    if([email, username, password, cpassword].some(field => field === "")) throw new ApiError(400, "All fields are required");

    if(password !== cpassword) throw new ApiError(400, "Password & confirm password must be identical");

    const user = await User.getUser(email, username);
    if(user) throw new ApiError(400, "The email or username you entered is already exist.");
    
    try 
    {
        const createUser = await User.create(request.body);
        const userData = createUser.toObject();
        delete userData.password; // Exclude password
        return response.status(201).json(new ApiResponse(201, userData, "User has been created successfully"));
    } 
    catch (error) 
    {
        throw new ApiError(500, error.message);
    }
};

module.exports = { signup };