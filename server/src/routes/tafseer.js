const { createTafseer, fetchTafseers, fetchSingleTafseer, updateTafseer, deleteTafseer } = require("../controllers/tafseer");
const { authentication, authorization } = require("../middlewares/auth");

// Router instance
const tafseerRouter = require("express").Router();

tafseerRouter.route("/")
.post(authentication, authorization(["Admin"]), createTafseer) // Create tafseer
.get(fetchTafseers); // Fetch all tafseers

tafseerRouter.route("/:id")
.get(fetchSingleTafseer) // Fetch single tafseer
.put(authentication, authorization(["Admin"]), updateTafseer)      // Update tafseer
.delete(authentication, authorization(["Admin"]), deleteTafseer);  // Delete tafseer

module.exports = tafseerRouter;