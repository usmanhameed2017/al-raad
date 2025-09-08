const shortid = require("shortid");

// Generate code for account activation and password resets with expiry time
const generateCode = (expiresInMinutes = 15) => {
    const code = shortid.generate();
    const expiresAt = new Date(Date.now() + 1000 * 60 * expiresInMinutes);
    return { code, expiresAt };
};

module.exports = generateCode;