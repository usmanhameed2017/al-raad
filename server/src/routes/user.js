const { signup, accountActivation, login, logout, fetchUsers, editUser, deleteUser, fetchSingleUser } = require("../controllers/user");
const { authentication, authorization } = require("../middlewares/auth");

const userRouter = require("express").Router();

// Signup
userRouter.route("/signup").post(signup);

// Account activation
userRouter.route("/accountActivation").put(accountActivation);

// Login
userRouter.route("/login").get(login);

// Fetch all user
userRouter.route("/").get(authentication, authorization(["Admin"]), fetchUsers)

// Multi operations
userRouter.route("/:id")
.get(authentication, authorization(["Admin"]), fetchSingleUser)  // Fetch single user
.put(authentication, authorization(["Admin"]), editUser)    // Edit user
.put(authentication, authorization(["Admin"]), deleteUser); // Delete user

// Logout
userRouter.route("/logout").get(authentication, logout);

module.exports = userRouter;