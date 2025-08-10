// Backend URL
export const backendURL = import.meta.env.VITE_BACKEND_URL;

// Axios options
export const axiosOptions = { withCredentials:true };

// Cloudinary cloud name
export const cloudinaryCloudName = import.meta.env.CLOUDINARY_CLOUD_NAME;

// Allowed image type
export const allowedImageTypes = ["image/png", "image/jpg", "image/jpeg", "image/webp", "image/gif"];

// Get user object from local storage
export const getUser = () => {
    try 
    {
        return JSON.parse(localStorage.getItem("user")) || null;
    } 
    catch (error) 
    {
        console.log("Failed to parse user from local storage:", error.message)
        return null;
    }
};