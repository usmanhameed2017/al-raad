const jwt = require("../service/auth-token");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");

// Verify Authentication
const isAuthenticated = async (request, response) => {
    const accessToken = request.signedCookies?.accessToken || request.headers?.["authorization"]?.split(" ")?.[1] || null;
    if(!accessToken) return response.status(200).json(new ApiResponse(200, null, "Not logged-in"));

    // Verify token
    const user = jwt.verifyAccessToken(accessToken);
    if(!user) throw new ApiError(401, "Invalid or expired token");

    // Response
    return response.status(200).json(new ApiResponse(200, user, "Authenticated"));
};

module.exports = { isAuthenticated };