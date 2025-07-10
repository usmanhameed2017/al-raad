const { signup, accountActivation, login, logout } = require("../controllers/user");
const { authentication } = require("../middlewares/auth");

const userRouter = require("express").Router();

// Signup
userRouter.route("/signup").post(signup);

// Account activation
userRouter.route("/accountActivation").put(accountActivation);

// Login
userRouter.route("/login").get(login);

// Logout
userRouter.route("/logout").get(authentication, logout);

module.exports = userRouter;