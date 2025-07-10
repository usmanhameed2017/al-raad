const ApiError = require("../utils/ApiError");
const { verifyAccessToken } = require("../utils/auth");

// Verify authentication
const authentication = (request, response, next) => {
    const token = request.signedCookies?.accessToken || request.headers?.["authorization"]?.split(" ")?.[1] || null;
    if(!token) throw new ApiError(404, "Access token is missing");

    const user = verifyAccessToken(token);
    if(!user) throw new ApiError(401, "Unauthenticated");

    request.user = user || null;
    return next();
};

// Authorization based on role
const authorization = (roles = []) => {
    return (request, response, next) => {
        if(!roles.includes(request.user?.role)) throw new ApiError(403, "Access denied");
        return next();
    }
};

module.exports = { authentication, authorization };