const { forgotPassword, verifyResetCode, resetPassword} = require("../controllers/security");
const csrfProtection = require("../middlewares/csrfToken");

// Router instance
const securityRouter = require("express").Router();

// Forgot password
securityRouter.route("/forgotPassword").post(csrfProtection, forgotPassword);
securityRouter.route("/verifyResetCode").patch(csrfProtection, verifyResetCode);
securityRouter.route("/resetPassword").patch(csrfProtection, resetPassword);

module.exports = securityRouter;