const jwt = require("jsonwebtoken");
const { accessTokenSecret, accessTokenExpiry } = require("../constants");

// Generate access token
const generateAccessToken = (user) => {
    if(!user) return null;
    try 
    {
        return jwt.sign({
            _id: user?._id,
            name: user?.name,
            username: user?.username,
            email: user?.email,
            role: user?.role
        }, accessTokenSecret, { expiresIn:accessTokenExpiry });
    } 
    catch(error) 
    {
        console.log(error.message);
        return null;
    }
};

module.exports = { generateAccessToken };