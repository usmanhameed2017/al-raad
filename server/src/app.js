const express = require("express");
const cors = require("cors");
const cookieParse = require("cookie-parser");
const path = require("path");
const { corsOptions } = require("./config");
const errorHandler = require("./middlewares/errorHandler");

// Express app
const app = express();

// ************* MIDDLEWARES ************* //
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended:true, limit:"20kb" }));
app.use(express.json({ limit:"20kb" }));
app.use(cookieParse());
app.use("/public", express.static(path.resolve("public")));

// Error handling middleware
app.use(errorHandler);

module.exports = app;