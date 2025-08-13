import client from '../utils/axios';

// Fetch all videos
export const fetchAllVideos = async (currentPage) => {
    try 
    {
        const response = await client.get(`/video?page=${currentPage}`);
        return response.data;
    } 
    catch(error) 
    {
        return error.message;
    }
};

// Fetch single video
export const fetchSingleVideo = async (id) => {
    try 
    {
        const response = await client.get(`/video/${id}`);
        return response.data;
    } 
    catch(error) 
    {
        return error.message;
    }
};