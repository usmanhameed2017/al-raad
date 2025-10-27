const { sendMail, replyToUser, fetchMails, fetchSingleMail, deleteMail } = require("../controllers/mail");
const { authentication, authorization } = require("../middlewares/auth");

// Router instance
const mailRouter = require("express").Router();

mailRouter.route("/")
.post(authentication, authorization(["Admin", "User"]), sendMail) // Send mail
.get(authentication, authorization(["Admin"]), fetchMails); // Fetch all mails

mailRouter.route("/:id")
.get(authentication, authorization(["Admin"]), fetchSingleMail) // Fetch single mail
.delete(authentication, authorization(["Admin"]), deleteMail); // Delete mail

// Reply to user
mailRouter.route("/replyToUser").post(authentication, authorization(["Admin"]), replyToUser);

module.exports = mailRouter;