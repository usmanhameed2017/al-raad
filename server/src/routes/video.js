const { authentication, authorization } = require("../middlewares/auth");
const upload = require("../middlewares/multer");

// Video router instance
const videoRouter = require("express").Router();


module.exports = videoRouter;