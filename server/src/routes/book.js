const { createBook, fetchBooks, fetchSingleBook, editBook, deleteBook } = require("../controllers/book");
const { authentication, authorization } = require("../middlewares/auth");
const upload = require("../middlewares/multer");

const bookRouter = require("express").Router();


bookRouter.route("/")
.post(authentication, authorization(["Admin"]), upload.fields([{ name:"pdf", maxCount:1 }, { name:"coverImage", maxCount:1 }]), createBook) // Create book
.get(fetchBooks); // Fetch all books

bookRouter.route("/:id")
.get(fetchSingleBook) // Fetch single book
.put(authentication, authorization(["Admin"]), upload.fields([{ name:"pdf", maxCount:1 }, { name:"coverImage", maxCount:1 }]), editBook) // Edit book
.delete(authentication, authorization(["Admin"]), deleteBook); // Delete book

module.exports = bookRouter;