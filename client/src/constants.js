import { createTheme } from "react-data-table-component";

// Backend URL
export const backendURL = import.meta.env.VITE_BACKEND_URL;

// Axios options
export const axiosOptions = { withCredentials:true };

// Cloudinary cloud name
export const cloudinaryCloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

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

// Check if array have some data
export const isArrayHaveData = (arrayData) => {
    if(arrayData && Array.isArray(arrayData) && arrayData?.length > 0) return true;
    return false
};

// Data table theme
export const datatableTheme = createTheme("alRaad",{
    text: { primary: "#e5e7eb", secondary: "#cbd5e1" },
    background: { default: "#0e0f16" },
    context: { background: "#0dcdbc", text: "#0e0f16" },
    divider: { default: "rgba(13,205,188,0.20)" },
    action: { button: "rgba(13,205,188,0.9)", hover: "rgba(13,205,188,0.08)", disabled: "rgba(255,255,255,0.3)" },
}, "dark");