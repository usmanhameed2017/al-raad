const multer = require("multer");

// Storage
const storage = multer.diskStorage({
    destination:function(_, _, cb)
    {
        return cb(null, "./public/temp");
    },
    filename:function(_, file, cb)
    {
        return cb(null, `${Date.now()}-${file.originalname}`);
    }
});

// Limit 
const limits = { fileSize: 1024 * 1024 * 20 }; // 20MB

// Initialize multer
const upload = multer({ storage, limits });

module.exports = upload;