const { signup, accountActivation, login, logout, fetchUsers, editUser, deleteUser, 
fetchSingleUser, adminLogin, createUser, } = require("../controllers/user");
const { authentication, authorization } = require("../middlewares/auth");
const csrfProtection = require("../middlewares/csrfToken");

// Router instance
const userRouter = require("express").Router();

// Signup
userRouter.route("/signup").post(csrfProtection, signup);

// Account activation
userRouter.route("/account/activation").patch(csrfProtection, accountActivation);

// User Login
userRouter.route("/login").post(csrfProtection, login);

// Admin login
userRouter.route("/admin/login").post(csrfProtection, adminLogin);

// Create user (Created by admin)
userRouter.route("/create").post(csrfProtection, authentication, authorization(["Admin"]), createUser)

// Fetch all users
userRouter.route("/").get(authentication, authorization(["Admin"]), fetchUsers);

// Fetch logged-in user data
userRouter.route("/me").get(authentication, authorization(["Admin", "User"]), fetchSingleUser);

// Self-modification
userRouter.route("/me/edit").put(csrfProtection, authentication, authorization(["Admin", "User"]), editUser);

// Logout
userRouter.route("/logout").get(authentication, logout);

// Multi operations
userRouter.route("/:id")
.get(authentication, authorization(["Admin"]), fetchSingleUser)           // Fetch single user
.put(csrfProtection, authentication, authorization(["Admin"]), editUser)  // Edit user
.delete(csrfProtection, authentication, authorization(["Admin"]), deleteUser);            // Delete user

module.exports = userRouter;