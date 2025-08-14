import client from '../utils/axios';

// Get request
export const getRequest = async (url) => {
    try 
    {
        const response = await client.get(url);
        return response.data;
    } 
    catch(error) 
    {
        return error.message;
    }
};