const { origin } = require("../constants");

const corsOptions = {
    origin:origin,
    credentials:true,
    methods:["GET", "POST", "PUT", "PATCH", "DELETE"]
};

const cookieOptions = {
    httpOnly:true,
    secure:false,
    maxAge: 1000 * 60 * 60 * 7, // 7 hours
    signed:true
};

module.exports = { corsOptions, cookieOptions };