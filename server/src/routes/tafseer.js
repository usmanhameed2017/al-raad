const { createTafseer, fetchTafseers, fetchSingleTafseer, updateTafseer } = require("../controllers/tafseer");
const { authentication, authorization } = require("../middlewares/auth");

const tafseerRouter = require("express").Router();

tafseerRouter.route("/")
.post(authentication, authorization(["Admin"]), createTafseer) // Create tafseer
.get(authentication, authorization(["Admin"]), fetchTafseers); // Fetch all tafseers

tafseerRouter.route("/:id")
.get(authentication, authorization(["Admin"]), fetchSingleTafseer)
.put(authentication, authorization(["Admin"]), updateTafseer)

module.exports = tafseerRouter;