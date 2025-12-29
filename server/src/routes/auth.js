const { isAuthenticated } = require("../controllers/auth");
const limitRequest = require("../middlewares/rateLimit");

// Router instance
const authRouter = require("express").Router();

// Verify access token
authRouter.route("/isAuthenticated").get(limitRequest({}), isAuthenticated);

module.exports = authRouter;