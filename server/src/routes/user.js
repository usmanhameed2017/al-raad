const { signup, accountActivation, login, logout, fetchUsers, editUser, deleteUser } = require("../controllers/user");
const { authentication, authorization } = require("../middlewares/auth");

const userRouter = require("express").Router();

// Signup
userRouter.route("/signup").post(signup);

// Account activation
userRouter.route("/accountActivation").put(accountActivation);

// Login
userRouter.route("/login").get(login);

// Multi operations
userRouter.route("/")
.get(authentication, authorization(["Admin"]), fetchUsers)  // Fetch all user
.put(authentication, authorization(["Admin"]), editUser)    // Edit user
.put(authentication, authorization(["Admin"]), deleteUser); // Delete user

// Logout
userRouter.route("/logout").get(authentication, logout);

module.exports = userRouter;