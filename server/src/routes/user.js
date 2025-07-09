const { signup } = require("../controllers/user");

const userRouter = require("express").Router();

userRouter.route("/signup")
.post(signup)

module.exports = userRouter;