import client from '../utils/axios';

// Fetch all audios
export const fetchAllAudios = async (currentPage) => {
    try 
    {
        const response = await client.get(`/audio?page=${currentPage}`);
        return response.data;
    } 
    catch(error) 
    {
        return error.message;
    }
};

// Fetch single audio
export const fetchSingleAudio = async (id) => {
    try 
    {
        const response = await client.get(`/audio/${id}`);
        return response.data;
    } 
    catch(error) 
    {
        return error.message;
    }
};