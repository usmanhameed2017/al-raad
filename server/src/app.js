const express = require("express");
const cors = require("cors");
const cookieParse = require("cookie-parser");
const path = require("path");
const { corsOptions } = require("./config");
const { cookieParserSecret } = require("./constants");
const errorHandler = require("./middlewares/errorHandler");
const { Server } = require("socket.io");
const http = require("http");
const passport = require("passport");
require("./service/social-auth");
const compression = require("compression");

// Express app
const app = express();

// Create HTTP Server
const server = http.createServer(app);

// Binding with socket server
const io = new Server(server, { cors:corsOptions });

// ************* MIDDLEWARES ************* //
app.use(cors(corsOptions));
app.use(cookieParse(cookieParserSecret));
app.use(passport.initialize());
app.use(express.urlencoded({ extended:true, limit:"100kb" }));
app.use(express.json({ limit:"100kb" }));
app.use("/public", express.static(path.resolve("public")));
app.use(compression());
app.use((request, response, next) => {
    request.io = io;
    next();
});

// ************* ROUTES ************* //
// Imports
const userRouter = require("./routes/user");
const tafseerRouter = require("./routes/tafseer");
const bookRouter = require("./routes/book");
const audioRouter = require("./routes/audio");
const mailRouter = require("./routes/mails");
const securityRouter = require("./routes/security");
const authRouter = require("./routes/auth");

// Registered routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/tafseer", tafseerRouter);
app.use("/api/v1/book", bookRouter);
app.use("/api/v1/audio", audioRouter);
app.use("/api/v1/mail", mailRouter);
app.use("/api/v1/security", securityRouter);
app.use("/api/v1/auth", authRouter);

// Error handling middleware
app.use(errorHandler);

module.exports = { app, server };