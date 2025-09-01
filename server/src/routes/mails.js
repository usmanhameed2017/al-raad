const { sendMail, fetchMails, fetchSingleMail, deleteMail } = require("../controllers/mail");
const { authentication, authorization } = require("../middlewares/auth");
const csrfProtection = require("../middlewares/csrfToken");

// Router instance
const mailRouter = require("express").Router();

mailRouter.route("/")
.post(csrfProtection, authentication, authorization(["Admin", "User"]), sendMail) // Send mail
.get(authentication, authorization(["Admin"]), fetchMails); // Fetch all mails

mailRouter.route("/:id")
.get(authentication, authorization(["Admin"]), fetchSingleMail) // Fetch single mail
.delete(authentication, authorization(["Admin"]), deleteMail); // Delete mail

module.exports = mailRouter;