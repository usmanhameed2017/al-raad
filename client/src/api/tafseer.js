import client from '../utils/axios';

// Fetch all tafseers
export const fetchAllTafseers = async (currentPage) => {
    try 
    {
        const response = await client.get(`/tafseer?page=${currentPage}`);
        return response.data;
    } 
    catch(error) 
    {
        return error.message;
    }
};

// Fetch single tafseer
export const fetchSingleTafseer = async (id) => {
    try 
    {
        const response = await client.get(`/tafseer/${id}`);
        return response.data;
    } 
    catch(error) 
    {
        return error.message;
    }
};