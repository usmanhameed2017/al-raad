const { createAudio, fetchAudios, fetchSingleAudio, updateAudio, deleteAudio } = require("../controllers/audio");
const { authentication, authorization } = require("../middlewares/auth");
const upload = require("../middlewares/multer");

// Audio router instance
const audioRouter = require("express").Router();

audioRouter.route("/")
.post(authentication, authorization(["Admin"]), upload.single("url"), createAudio) // Create audio
.get(fetchAudios) // Fetch all audios

audioRouter.route("/:id")
.get(fetchSingleAudio) // Fetch single audio
.put(authentication, authorization(["Admin"]), upload.single("url"), updateAudio) // Update audio
.delete(authentication, authorization(["Admin"]), deleteAudio); // Delete audio

module.exports = audioRouter;