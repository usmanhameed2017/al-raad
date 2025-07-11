const { createTafseer, fetchTafseers, fetchSingleTafseer, updateTafseer, deleteTafseer } = require("../controllers/tafseer");
const { authentication, authorization } = require("../middlewares/auth");

const tafseerRouter = require("express").Router();

tafseerRouter.route("/")
.post(authentication, authorization(["Admin"]), createTafseer) // Create tafseer
.get(authentication, authorization(["Admin"]), fetchTafseers); // Fetch all tafseers

tafseerRouter.route("/:id")
.get(authentication, authorization(["Admin"]), fetchSingleTafseer) // Fetch single tafseer
.put(authentication, authorization(["Admin"]), updateTafseer)      // Update tafseer
.delete(authentication, authorization(["Admin"]), deleteTafseer);  // Delete tafseer

module.exports = tafseerRouter;