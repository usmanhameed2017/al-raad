const { forgotPassword, verifyResetCode, resetPassword} = require("../controllers/security");
const limitRequest = require("../middlewares/rateLimit");

// Router instance
const securityRouter = require("express").Router();

// Forgot password
securityRouter.route("/forgotPassword")
.post(limitRequest({ maxRequests:1, message:"You can request a new verification code after 60 seconds." }), forgotPassword);
securityRouter.route("/verifyResetCode").patch(limitRequest({ maxRequests:5 }), verifyResetCode);
securityRouter.route("/resetPassword").patch(resetPassword);

module.exports = securityRouter;