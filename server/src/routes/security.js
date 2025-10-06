const { forgotPassword, verifyResetCode, resetPassword} = require("../controllers/security");
const csrfProtection = require("../middlewares/csrfToken");
const limitRequest = require("../middlewares/rateLimit");

// Router instance
const securityRouter = require("express").Router();

// Forgot password
securityRouter.route("/forgotPassword")
.post(limitRequest({ maxRequests:1, message:"You can request a new verification code after 60 seconds." }), csrfProtection, forgotPassword);
securityRouter.route("/verifyResetCode").patch(limitRequest({ maxRequests:5 }), csrfProtection, verifyResetCode);
securityRouter.route("/resetPassword").patch(csrfProtection, resetPassword);

module.exports = securityRouter;