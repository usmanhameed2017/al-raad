const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");

// Verify Authentication
const isAuthenticated = async (request, response) => {
    if(!request.user) throw new ApiError(401, "Unauthenticated");
    return response.status(200).json(new ApiResponse(200, request.user, "Authenticated"));
};

module.exports = { isAuthenticated };