const { customAlphabet } = require("nanoid");
const bcrypt = require("bcrypt");
const ApiError = require("./ApiError");

// Generate code for account activation and password resets with expiry time
const generateCode = async (length = 9, expiresInMinutes = 15, isHashed = true) => {
    let hashedCode = null;

    // Validate expiry time
    if(expiresInMinutes <= 0) throw new ApiError(500, "Expiry time must be positive");

    // To keep only alpha-numeric values
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"; 

    // Generate code
    const nanoid = customAlphabet(alphabet, length);
    const code = nanoid();

    // Generate expiry time
    const expiresAt = new Date(Date.now() + 1000 * 60 * expiresInMinutes);

    // If hashed needed
    if(isHashed) hashedCode = await bcrypt.hash(code, 10);

    // Return payload
    return { code, hashedCode: isHashed ? hashedCode : null, expiresAt };
};

module.exports = generateCode;