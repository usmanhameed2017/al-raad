const csrf = require("csurf");

// CSRF Protection Middleware for unintended form submission
const csrfProtection = csrf({ cookie: true });

module.exports = csrfProtection;