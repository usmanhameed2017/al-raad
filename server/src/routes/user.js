const { signup, accountActivation, login } = require("../controllers/user");

const userRouter = require("express").Router();

// Signup
userRouter.route("/signup").post(signup);

// Account activation
userRouter.route("/accountActivation").put(accountActivation);

// Login
userRouter.route("/login").get(login);

module.exports = userRouter;