const { signup, accountActivation, login, logout, fetchUsers, editUser, deleteUser, 
fetchSingleUser, verifyAccessToken, generateCsrfToken } = require("../controllers/user");
const { authentication, authorization } = require("../middlewares/auth");
const csrfProtection = require("../middlewares/csrfToken");

const userRouter = require("express").Router();

// Generate CSRF Token
userRouter.route("/generateCsrfToken").get(csrfProtection, generateCsrfToken);

// Signup
userRouter.route("/signup").post(csrfProtection, signup);

// Account activation
userRouter.route("/accountActivation").patch(accountActivation);

// Login
userRouter.route("/login").post(csrfProtection, login);

// Verify access token
userRouter.route("/verifyAccessToken").get(authentication, verifyAccessToken);

// Fetch all users
userRouter.route("/").get(authentication, authorization(["Admin"]), fetchUsers);

// Fetch logged-in user data
userRouter.route("/me").get(authentication, authorization(["Admin", "User"]), fetchSingleUser);

// Logout
userRouter.route("/logout").get(authentication, logout);

// Multi operations
userRouter.route("/:id")
.get(authentication, authorization(["Admin"]), fetchSingleUser) // Fetch single user
.put(authentication, authorization(["Admin"]), editUser)        // Edit user
.delete(authentication, authorization(["Admin"]), deleteUser);  // Delete user

module.exports = userRouter;