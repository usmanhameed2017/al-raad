const { createBook, fetchBooks } = require("../controllers/book");
const { authentication, authorization } = require("../middlewares/auth");
const upload = require("../middlewares/multer");

const bookRouter = require("express").Router();

// Create book
bookRouter.route("/")
.post(authentication, authorization(["Admin"]), upload.fields([{ name:"pdf", maxCount:1 }, { name:"coverImage", maxCount:1 }]), createBook)
.get(fetchBooks);

module.exports = bookRouter;