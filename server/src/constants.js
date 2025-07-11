// Ports and origins
const port = process.env.PORT || 8000;
const origin = process.env.ORIGIN;

// Database
const mongoURL = process.env.MONGO_URL;
const dbName = process.env.DB_NAME;

// JWT
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const accessTokenExpiry = process.env.ACCESS_TOKEN_EXPIRY;

// Cookie parser secret
const cookieParserSecret = process.env.COOKIE_PARSER_SECRET;

// Cloudinary
const cloudinaryCloudName = process.env.CLOUDINARY_CLOUD_NAME;
const cloudinaryApiKey = process.env.CLOUDINARY_API_KEY;
const cloudinaryApiSecret = process.env.CLOUDINARY_API_SECRET;

const gmail = process.env.GMAIL;
const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;

module.exports = { 
    port, 
    origin, 
    mongoURL, 
    dbName, 
    accessTokenSecret, 
    accessTokenExpiry,
    cookieParserSecret,
    cloudinaryCloudName,
    cloudinaryApiKey,
    cloudinaryApiSecret,
    gmail,
    gmailAppPassword
};