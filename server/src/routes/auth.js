const { generateCsrfToken, verifyAccessToken } = require("../controllers/auth");
const { authentication } = require("../middlewares/auth");
const csrfProtection = require("../middlewares/csrfToken");
const limitRequest = require("../middlewares/rateLimit");

// Router instance
const authRouter = require("express").Router();

// Generate CSRF Token
authRouter.route("/generateCsrfToken").get(csrfProtection, generateCsrfToken);

// Verify access token
authRouter.route("/verifyAccessToken").get(limitRequest({}), authentication, verifyAccessToken);

module.exports = authRouter;