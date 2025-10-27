const { generateCsrfToken, isAuthenticated } = require("../controllers/auth");
const { authentication } = require("../middlewares/auth");
const limitRequest = require("../middlewares/rateLimit");

// Router instance
const authRouter = require("express").Router();

// Generate CSRF Token
authRouter.route("/generateCsrfToken").get(generateCsrfToken);

// Verify access token
authRouter.route("/isAuthenticated").get(limitRequest({}), authentication, isAuthenticated);

module.exports = authRouter;