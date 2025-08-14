import client from '../utils/axios';

// Fetch all users
export const fetchAllUsers = async (currentPage) => {
    try 
    {
        const response = await client.get(`/user?page=${currentPage}`);
        return response.data;
    } 
    catch(error) 
    {
        return error.message;
    }
};

// Fetch single user
export const fetchSingleUser = async (url) => {
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