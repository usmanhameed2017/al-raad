const csrf = require("csurf");
const { cookieOptions } = require("../config");

// CSRF Protection Middleware for unintended form submission
const csrfProtection = csrf({ cookie: cookieOptions });

module.exports = csrfProtection;