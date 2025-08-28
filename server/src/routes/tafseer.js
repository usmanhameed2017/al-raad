const { createTafseer, fetchTafseers, fetchSingleTafseer, updateTafseer, deleteTafseer } = require("../controllers/tafseer");
const { authentication, authorization } = require("../middlewares/auth");
const csrfProtection = require("../middlewares/csrfToken");

const tafseerRouter = require("express").Router();

tafseerRouter.route("/")
.post(csrfProtection, authentication, authorization(["Admin"]), createTafseer) // Create tafseer
.get(authentication, authorization(["Admin", "User"]), fetchTafseers); // Fetch all tafseers

tafseerRouter.route("/:id")
.get(authentication, authorization(["Admin", "User"]), fetchSingleTafseer) // Fetch single tafseer
.put(csrfProtection, authentication, authorization(["Admin"]), updateTafseer)      // Update tafseer
.delete(authentication, authorization(["Admin"]), deleteTafseer);  // Delete tafseer

module.exports = tafseerRouter;