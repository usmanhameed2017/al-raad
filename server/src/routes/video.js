const { createVideo, fetchVideos, fetchSingleVideo, updateVideo } = require("../controllers/video");
const { authentication, authorization } = require("../middlewares/auth");
const upload = require("../middlewares/multer");

// Video router instance
const videoRouter = require("express").Router();

videoRouter.route("/")
.post(authentication, authorization(["Admin"]), upload.single("url"), createVideo) // Create video
.get(fetchVideos) // Fetch all videos


videoRouter.route("/:id")
.get(fetchSingleVideo)
.put(authentication, authorization(["Admin"]), upload.single("url"), updateVideo)

module.exports = videoRouter;