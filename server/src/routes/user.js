const { signup, accountActivation } = require("../controllers/user");

const userRouter = require("express").Router();

// Signup
userRouter.route("/signup").post(signup);

// Account activation
userRouter.route("/accountActivation").put(accountActivation);

module.exports = userRouter;