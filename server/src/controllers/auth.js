const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");

// Initialize CSRF Token
const initCsrfToken = async (request, response) => {
    return response.status(200)
    .json(new ApiResponse(200, request.csrfToken(), "CSRF Token has been generated successfully"));
};

// Verify Authentication
const isAuthenticated = async (request, response) => {
    if(!request.user) throw new ApiError(401, "Unauthenticated");
    return response.status(200).json(new ApiResponse(200, request.user, "Authenticated"));
};

module.exports = { initCsrfToken, isAuthenticated };