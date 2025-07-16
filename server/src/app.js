const express = require("express");
const cors = require("cors");
const cookieParse = require("cookie-parser");
const path = require("path");
const { corsOptions } = require("./config");
const { cookieParserSecret } = require("./constants");
const errorHandler = require("./middlewares/errorHandler");

// Express app
const app = express();

// ************* MIDDLEWARES ************* //
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended:true, limit:"20kb" }));
app.use(express.json({ limit:"20kb" }));
app.use(cookieParse(cookieParserSecret));
app.use("/public", express.static(path.resolve("public")));


// ************* ROUTES ************* //
// Imports
const userRouter = require("./routes/user");
const tafseerRouter = require("./routes/tafseer");
const bookRouter = require("./routes/book");
const videoRouter = require("./routes/video");

// Registered routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/tafseer", tafseerRouter);
app.use("/api/v1/book", bookRouter);
app.use("/api/v1/video", videoRouter);

// Error handling middleware
app.use(errorHandler);

module.exports = app;