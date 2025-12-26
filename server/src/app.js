const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const { corsOptions } = require("./config");
const { cookieParserSecret } = require("./constants");
const errorHandler = require("./middlewares/errorHandler");
const passport = require("passport");
require("./service/social-auth");
const compression = require("compression");
const http = require("http");
const { Server } = require("socket.io");
const { createAdapter } = require("@socket.io/redis-adapter");
const connectToRedis = require("./redis/connection");

// Initialization
function createApp()
{
    // Initialize Express App
    const app = express();

    // Create HTTP Server
    const server = http.createServer(app);

    // ************* SCALE-UP SOCKET.IO USING REDIS ADAPTER ************* //
    const { pubClient, subClient } = connectToRedis();
    
    // Initialize Socket.IO
    const io = new Server(server, { cors:corsOptions, adapter:createAdapter(pubClient, subClient) });

    // ************* MIDDLEWARES ************* //
    app.use(cors(corsOptions));
    app.use(cookieParser(cookieParserSecret));
    app.use(passport.initialize());
    app.use(express.urlencoded({ extended: true, limit: "100kb" }));
    app.use(express.json({ limit: "100kb" }));
    app.use("/public", express.static(path.resolve("public")));
    app.use(compression());

    // Make io available to all routes
    app.use((request, response, next) => {
        request.io = io;
        next();
    });

    // ************* ROUTES ************* //
    const authRouter = require("./routes/auth");
    const userRouter = require("./routes/user");
    const tafseerRouter = require("./routes/tafseer");
    const bookRouter = require("./routes/book");
    const audioRouter = require("./routes/audio");
    const mailRouter = require("./routes/mails");
    const securityRouter = require("./routes/security");

    // Registered routes
    app.use("/api/v1/auth", authRouter);
    app.use("/api/v1/user", userRouter);
    app.use("/api/v1/tafseer", tafseerRouter);
    app.use("/api/v1/book", bookRouter);
    app.use("/api/v1/audio", audioRouter);
    app.use("/api/v1/mail", mailRouter);
    app.use("/api/v1/security", securityRouter);
    app.get("/api/v1/status", (request, response) => response.json({ ok:true }));

    // Error handling middleware
    app.use(errorHandler);

    return { server, io };
}

module.exports = createApp;