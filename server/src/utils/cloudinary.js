const { v2:cloudinary } = require("cloudinary");
const { cloudinaryCloudName, cloudinaryApiKey, cloudinaryApiSecret } = require("../constants");
const fs = require("fs");
const path = require("path");

// Configuration
cloudinary.config({
    cloud_name:cloudinaryCloudName,
    api_key:cloudinaryApiKey,
    api_secret:cloudinaryApiSecret
});

// Delete file from temporary storage (Server)
const deleteFromTemp = (...localFilePaths) => {
    localFilePaths.forEach(localFilePath => {
        if(localFilePath && fs.existsSync(localFilePath)) 
        {
            fs.unlinkSync(localFilePath);
        }
    });
};

// Upload file on cloudinary
const uploadOnCloudinary = async (localFilePath, resourceType, folderName) => {
    if (!localFilePath) return null;

    try 
    {
        // File options
        const options = {
            resource_type: resourceType,
            folder: `al-raad/${folderName}`,
            unique_filename: false,
            access_mode: "public",
            chunk_size: 6000000 // 6MB
        };

        let response;

        if(resourceType === "video")
        {
            // Wrapper for upload large file
            response = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_large(localFilePath, options, (error, data) => {
                    if (error) return reject(error.message);
                    return resolve(data);
                });
            });
        }
        else
        {
            response = await cloudinary.uploader.upload(localFilePath, options);
        }

        // Delete file from temporary storage
        deleteFromTemp(localFilePath);
        if (!response.secure_url) return null;
        return response.secure_url;
    } 
    catch (error) 
    {
        deleteFromTemp(localFilePath);
        console.log("Cloudinary Upload Error:", error.message);
        return null;
    }
};

// Delete file from cloudinary
const deleteFromCloudinary = async (cloudinaryUrl, resourceType, folderName) => {
    if(!cloudinaryUrl) return null;

    let public_id;
    if(resourceType !== "raw")
    {
        public_id = `al-raad/${folderName}/${path.parse(cloudinaryUrl).name}`; // Image without extension
    }
    else
    {
        public_id = `al-raad/${folderName}/${path.parse(cloudinaryUrl).base}`; // Pdf with extension
    }   

    try 
    {
        const response = await cloudinary.uploader.destroy(public_id, { resource_type:resourceType });
        return response;
    } 
    catch(error) 
    {
        console.log(error.mesage);
        return null;
    }
};

module.exports = { uploadOnCloudinary, deleteFromCloudinary, deleteFromTemp };