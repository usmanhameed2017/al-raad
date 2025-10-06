const rateLimit = require('express-rate-limit');
const ApiError = require('../utils/ApiError');

// Limit the requests
const limitRequest = ({ message = "Too many requests, please try again later", minutes = 1, maxRequests = 10 }) => {
    const limiter = rateLimit({
        windowMs: 1000 * 60 * minutes,
        max: maxRequests, // Max requests per IP per window
        handler: () => {
            throw new ApiError(429, message);
        }
    });
    return limiter;
};

module.exports = limitRequest;