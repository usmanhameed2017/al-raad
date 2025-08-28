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

// Surah list
export const surahList = ["Al-Fatihah", "Al-Baqarah", "Aal-E-Imran", "An-Nisa", "Al-Maidah", "Al-An'am", "Al-A'raf", "Al-Anfal", "At-Tawbah", "Yunus",  
"Hud", "Yusuf", "Ar-Ra'd", "Ibrahim", "Al-Hijr", "An-Nahl", "Al-Isra", "Al-Kahf", "Maryam", "Ta-Ha", "Al-Anbiya", "Al-Hajj", "Al-Mu’minun",  
"An-Nur", "Al-Furqan", "Ash-Shu'ara", "An-Naml", "Al-Qasas", "Al-Ankabut", "Ar-Rum", "Luqman", "As-Sajda", "Al-Ahzab", "Saba", "Fatir", "Ya-Sin",  
"As-Saffat", "Sad", "Az-Zumar", "Ghafir", "Fussilat", "Ash-Shura", "Az-Zukhruf", "Ad-Dukhan", "Al-Jathiyah", "Al-Ahqaf", "Muhammad", "Al-Fath",  
"Al-Hujurat", "Qaf", "Adh-Dhariyat", "At-Tur", "An-Najm", "Al-Qamar", "Ar-Rahman", "Al-Waqia", "Al-Hadid", "Al-Mujadila", "Al-Hashr", "Al-Mumtahina",  
"As-Saff", "Al-Jumu'a", "Al-Munafiqun", "At-Taghabun", "At-Talaq", "At-Tahrim", "Al-Mulk", "Al-Qalam", "Al-Haqqa", "Al-Ma'arij", "Nuh", "Al-Jinn",  
"Al-Muzzammil", "Al-Muddathir", "Al-Qiyama", "Al-Insan", "Al-Mursalat", "An-Naba", "An-Nazi'at", "Abasa", "At-Takwir", "Al-Infitar", "Al-Mutaffifin",  
"Al-Inshiqaq", "Al-Buruj", "At-Tariq", "Al-A'la", "Al-Ghashiya", "Al-Fajr", "Al-Balad", "Ash-Shams", "Al-Lail", "Ad-Duha", "Ash-Sharh", "At-Teen",  
"Al-Alaq", "Al-Qadr", "Al-Bayyina", "Az-Zalzala", "Al-Adiyat", "Al-Qari'a", "At-Takasur", "Al-Asr", "Al-Humazah", "Al-Feel", "Quraish", "Al-Ma'un",  
"Al-Kawsar", "Al-Kafirun", "An-Nasr", "Lahab", "Al-Ikhlas", "Al-Falaq", "Naas"];