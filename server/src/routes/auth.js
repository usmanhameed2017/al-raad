const { generateCsrfToken, verifyAccessToken } = require("../controllers/auth");
const { authentication } = require("../middlewares/auth");
const csrfProtection = require("../middlewares/csrfToken");

// Router instance
const authRouter = require("express").Router();

// Generate CSRF Token
authRouter.route("/generateCsrfToken").get(csrfProtection, generateCsrfToken);

// Verify access token
userRouter.route("/verifyAccessToken").get(authentication, verifyAccessToken);

module.exports = authRouter;