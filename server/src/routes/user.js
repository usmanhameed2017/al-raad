const { signup, accountActivation, login, logout, fetchUsers, editUser, deleteUser, fetchSingleUser, verifyAccessToken } = require("../controllers/user");
const { authentication, authorization } = require("../middlewares/auth");

const userRouter = require("express").Router();

// Signup
userRouter.route("/signup").post(signup);

// Account activation
userRouter.route("/accountActivation").put(accountActivation);

// Login
userRouter.route("/login").post(login);

// Verify access token
userRouter.route("/verifyAccessToken").get(authentication, verifyAccessToken);

// Fetch all users
userRouter.route("/").get(authentication, authorization(["Admin"]), fetchUsers);

// Logout
userRouter.route("/logout").get(authentication, logout);

// Multi operations
userRouter.route("/:id")
.get(authentication, authorization(["Admin"]), fetchSingleUser) // Fetch single user
.put(authentication, authorization(["Admin"]), editUser)        // Edit user
.delete(authentication, authorization(["Admin"]), deleteUser);  // Delete user

module.exports = userRouter;