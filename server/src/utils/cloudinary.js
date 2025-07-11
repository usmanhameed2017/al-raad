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
const deleteFromTemp = (localFilePath) => {
    if(localFilePath && fs.existsSync(localFilePath)) 
    {
        fs.unlinkSync(localFilePath);
    }
};

// Upload
const uploadOnCloudinary = async (localFilePath) => {
    if(!localFilePath) return null;
    
    try 
    {
        const response = await cloudinary.uploader.upload(localFilePath, { resource_type:"auto" });
        deleteFromTemp(localFilePath);
        return response.url;
    } 
    catch(error) 
    {
        deleteFromTemp(localFilePath);
        return null;
    }
};

// Get public id
const getPublicID = (url) => {
    if(!url) return null;
    const public_id = path.parse(url).name;
    return public_id;
}

// Delete file from cloudinary
const deleteFromCloudinary = async (public_id) => {
    if(!public_id) return null;
    try 
    {
        const response = await cloudinary.uploader.destroy(public_id);
        return response;
    } 
    catch(error) 
    {
        console.log(error.mesage);
        return null;
    }
};

module.exports = { deleteFromCloudinary, uploadOnCloudinary, getPublicID, deleteFromTemp };