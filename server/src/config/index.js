const { origin } = require("../constants");

const corsOptions = {
    origin:origin,
    credentials:true,
    methods:["GET", "POST", "PUT", "PATCH", "DELETE"]
};

module.exports = { corsOptions };