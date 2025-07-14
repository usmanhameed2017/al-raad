const { createBook } = require("../controllers/book");
const upload = require("../middlewares/multer");

const bookRouter = require("express").Router();

// Create book
bookRouter.route("/")
.post(upload.fields([{ name:"pdf", maxCount:1 }, { name:"coverImage", maxCount:1 }]), createBook);

module.exports = bookRouter;