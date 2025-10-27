const { signup, accountActivation, login, logout, fetchUsers, editUser, deleteUser, 
fetchSingleUser, adminLogin, createUser, googleLogin, } = require("../controllers/user");
const { authentication, authorization } = require("../middlewares/auth");
const passport = require("passport");

// Router instance
const userRouter = require("express").Router();

// Signup
userRouter.route("/signup").post(signup);

// Account activation
userRouter.route("/account/activation").patch(accountActivation);

// User Login
userRouter.route("/login").post(login);

// Admin login
userRouter.route("/admin/login").post(adminLogin);

// Login as google
userRouter.route('/auth/google').get(passport.authenticate('google', { scope:['profile', 'email'], prompt:"select_account" }));
userRouter.route('/auth/google/callback').get(passport.authenticate('google', { session: false }), googleLogin);

// Create user (Created by admin)
userRouter.route("/create").post(authentication, authorization(["Admin"]), createUser)

// Fetch all users
userRouter.route("/").get(authentication, authorization(["Admin"]), fetchUsers);

// Fetch logged-in user data
userRouter.route("/me").get(authentication, authorization(["Admin", "User"]), fetchSingleUser);

// Self-modification
userRouter.route("/me/edit").put(authentication, authorization(["Admin", "User"]), editUser);

// Logout
userRouter.route("/logout").get(authentication, logout);

// Multi operations
userRouter.route("/:id")
.get(authentication, authorization(["Admin"]), fetchSingleUser)           // Fetch single user
.put(authentication, authorization(["Admin"]), editUser)  // Edit user
.delete(authentication, authorization(["Admin"]), deleteUser);            // Delete user

module.exports = userRouter;