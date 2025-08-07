// const { v2:cloudinary } = require("cloudinary");
// const { cloudinaryCloudName, cloudinaryApiKey, cloudinaryApiSecret } = require("../constants");
// const fs = require("fs");
// const path = require("path");

// // Configuration
// cloudinary.config({
//     cloud_name:cloudinaryCloudName,
//     api_key:cloudinaryApiKey,
//     api_secret:cloudinaryApiSecret
// });

// // Delete file from temporary storage (Server)
// const deleteFromTemp = (...localFilePaths) => {
//     localFilePaths.forEach(localFilePath => {
//         if(localFilePath && fs.existsSync(localFilePath)) 
//         {
//             fs.unlinkSync(localFilePath);
//         }
//     });
// };

// // Upload file on cloudinary
// // const uploadOnCloudinary = async (localFilePath, resourceType, folderName) => {
// //     if(!localFilePath) return null;
    
// //     try 
// //     {
// //         // File options
// //         const options = {
// //             resource_type:resourceType, 
// //             folder:`al-raad/${folderName}`, 
// //             unique_filename:false, 
// //             access_mode:"public"
// //         };

// //         const response = await cloudinary.uploader.upload(localFilePath, options);
// //         deleteFromTemp(localFilePath);
// //         return response.url;
// //     } 
// //     catch(error) 
// //     {
// //         deleteFromTemp(localFilePath);
// //         return null;
// //     }
// // };

// const uploadOnCloudinary = async (localFilePath, resourceType, folderName) => {
//     if (!localFilePath) return null;

//     try 
//     {
//         // File options
//         const options = {
//             resource_type: resourceType,
//             folder: `al-raad/${folderName}`,
//             unique_filename: false,
//             access_mode: "public"
//         };

//         let response;

//         if (resourceType === "video") 
//         {
//             response = await cloudinary.uploader.upload_large(localFilePath, {
//                 ...options,
//                 chunk_size: 6000000 // 6MB chunks
//             });
//         } 
//         else 
//         {
//             response = await cloudinary.uploader.upload(localFilePath, options);
//         }

//         deleteFromTemp(localFilePath);
//         return response.url;
//     } 
//     catch(error) 
//     {
//         deleteFromTemp(localFilePath);
//         console.log("Cloudinary Upload Error:", error.message);
//         return null;
//     }
// };

// // Delete file from cloudinary
// const deleteFromCloudinary = async (cloudinaryUrl, resourceType, folderName) => {
//     if(!cloudinaryUrl) return null;

//     let public_id;
//     if(resourceType !== "raw")
//     {
//         public_id = `al-raad/${folderName}/${path.parse(cloudinaryUrl).name}`; // Image without extension
//     }
//     else
//     {
//         public_id = `al-raad/${folderName}/${path.parse(cloudinaryUrl).base}`; // Pdf with extension
//     }   

//     try 
//     {
//         const response = await cloudinary.uploader.destroy(public_id, { resource_type:resourceType });
//         return response;
//     } 
//     catch(error) 
//     {
//         console.log(error.mesage);
//         return null;
//     }
// };

// module.exports = { uploadOnCloudinary, deleteFromCloudinary, deleteFromTemp };



const { v2: cloudinary } = require("cloudinary");
const { cloudinaryCloudName, cloudinaryApiKey, cloudinaryApiSecret } = require("../constants");
const streamifier = require("streamifier");
const path = require("path");

// Configuration
cloudinary.config({
    cloud_name: cloudinaryCloudName,
    api_key: cloudinaryApiKey,
    api_secret: cloudinaryApiSecret
});

// 🧹 Delete file from temp folder if used (still kept for backup if you ever use disk)
const fs = require("fs");
const deleteFromTemp = (...localFilePaths) => {
    localFilePaths.forEach(localFilePath => {
        if (localFilePath && fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }
    });
};

// ✅ Upload using Stream (Recommended for APIs like Postman or frontend)
const uploadOnCloudinary = (fileBuffer, resourceType, folderName) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                resource_type: resourceType,
                folder: `al-raad/${folderName}`,
                unique_filename: false,
                access_mode: "public"
            },
            (error, result) => {
                if (error) {
                    console.error("Cloudinary Upload Error:", error.message);
                    return reject(null);
                }
                return resolve(result.secure_url);
            }
        );

        streamifier.createReadStream(fileBuffer).pipe(stream);
    });
};

// ❌ Delete file from Cloudinary
const deleteFromCloudinary = async (cloudinaryUrl, resourceType, folderName) => {
    if (!cloudinaryUrl) return null;

    let public_id;
    if (resourceType !== "raw") {
        public_id = `al-raad/${folderName}/${path.parse(cloudinaryUrl).name}`; // Image/video without extension
    } else {
        public_id = `al-raad/${folderName}/${path.parse(cloudinaryUrl).base}`; // Raw file (e.g., PDF)
    }

    try {
        const response = await cloudinary.uploader.destroy(public_id, { resource_type: resourceType });
        return response;
    } catch (error) {
        console.log("Delete Error:", error.message);
        return null;
    }
};

module.exports = { uploadOnCloudinary, deleteFromCloudinary, deleteFromTemp };