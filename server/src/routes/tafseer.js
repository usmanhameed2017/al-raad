const { createTafseer } = require("../controllers/tafseer");
const { authentication, authorization } = require("../middlewares/auth");

const tafseerRouter = require("express").Router();

// Create tafseer
tafseerRouter.route("/")
.post(authentication, authorization(["Admin"]), createTafseer);

module.exports = tafseerRouter;