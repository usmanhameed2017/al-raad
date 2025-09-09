const { forgotPassword, verifyResetCode, resetPassword} = require("../controllers/security");
const csrfProtection = require("../middlewares/csrfToken");

// Router instance
const securityRouter = require("express").Router();

// Forgot password
securityRouter.route("/forgotPassword/:email").get(csrfProtection, forgotPassword);
securityRouter.route("/verifyResetCode/:resetCode/:_id").get(csrfProtection, verifyResetCode);
securityRouter.route("/resetPassword").patch(csrfProtection, resetPassword);

module.exports = securityRouter;