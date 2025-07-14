const { createBook, fetchBooks, fetchSingleBook } = require("../controllers/book");
const { authentication, authorization } = require("../middlewares/auth");
const upload = require("../middlewares/multer");

const bookRouter = require("express").Router();


bookRouter.route("/")
.post(authentication, authorization(["Admin"]), upload.fields([{ name:"pdf", maxCount:1 }, { name:"coverImage", maxCount:1 }]), createBook) // Create book
.get(fetchBooks); // Fetch all books

bookRouter.route("/:id")
.get(fetchSingleBook)

module.exports = bookRouter;