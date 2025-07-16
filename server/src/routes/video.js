const { createVideo } = require("../controllers/video");
const { authentication, authorization } = require("../middlewares/auth");
const upload = require("../middlewares/multer");

// Video router instance
const videoRouter = require("express").Router();

// Create video
videoRouter.route("/")
.post(authentication, authorization(["Admin"]), upload.single("url"), createVideo);

module.exports = videoRouter;