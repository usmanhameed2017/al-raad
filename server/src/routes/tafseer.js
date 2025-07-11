const { createTafseer, fetchTafseers } = require("../controllers/tafseer");
const { authentication, authorization } = require("../middlewares/auth");

const tafseerRouter = require("express").Router();

// Create tafseer
tafseerRouter.route("/")
.post(authentication, authorization(["Admin"]), createTafseer)
.get(authentication, authorization(["Admin"]), fetchTafseers);

module.exports = tafseerRouter;