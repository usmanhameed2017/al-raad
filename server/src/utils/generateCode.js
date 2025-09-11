const crypto = require("crypto");
const bcrypt = require("bcrypt");
const ApiError = require("./ApiError");

// Generate code for account activation and password resets with expiry time
const generateCode = async (length = 9, expiresInMinutes = 10, isHashed = true) => {
    // Validate expiry time
    if(expiresInMinutes <= 0) throw new ApiError(500, "Expiry time must be positive");

    // To keep only alpha-numeric values
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"; 

    // Generate code
    let code = "";
    const bytes = crypto.randomBytes(length);
    for (let i = 0; i < length; i++) 
    {
        code += alphabet[bytes[i] % alphabet.length];
    }    

    // Generate expiry time
    const expiresAt = new Date(Date.now() + 1000 * 60 * expiresInMinutes);

    // If hashed needed
    const hashedCode = isHashed ? await bcrypt.hash(code, 10) : null;

    // Return payload
    return { code, hashedCode, expiresAt };
};

module.exports = generateCode;