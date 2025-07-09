// Ports and origins
const port = process.env.PORT || 8000;
const origin = process.env.ORIGIN;

// Database
const mongoURL = process.env.MONGO_URL;
const dbName = process.env.DB_NAME;

// JWT
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const accessTokenExpiry = process.env.ACCESS_TOKEN_EXPIRY;

// Cloudinary
const cloudinary_cloud_name = process.env.CLOUDINARY_CLOUD_NAME;
const cloudinary_api_key = process.env.CLOUDINARY_API_KEY;
const cloudinary_api_secret = process.env.CLOUDINARY_API_SECRET;

const gmail = process.env.GMAIL;
const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;

module.exports = { 
    port, 
    origin, 
    mongoURL, 
    dbName, 
    accessTokenSecret, 
    accessTokenExpiry,
    cloudinary_cloud_name,
    cloudinary_api_key,
    cloudinary_api_secret,
    gmail,
    gmailAppPassword
};