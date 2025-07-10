const { signup, accountActivation, login, logout, fetchUsers } = require("../controllers/user");
const { authentication, authorization } = require("../middlewares/auth");

const userRouter = require("express").Router();

// Signup
userRouter.route("/signup").post(signup);

// Account activation
userRouter.route("/accountActivation").put(accountActivation);

// Login
userRouter.route("/login").get(login);

// Fetch users
userRouter.route("/").get(authentication, authorization(["Admin"]), fetchUsers);

// Logout
userRouter.route("/logout").get(authentication, logout);

module.exports = userRouter;