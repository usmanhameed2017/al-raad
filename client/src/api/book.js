import client from '../utils/axios';

// Fetch all books
export const fetchAllBooks = async (currentPage) => {
    try 
    {
        const response = await client.get(`/book?page=${currentPage}`);
        return response.data;
    } 
    catch(error) 
    {
        return error.message;
    }
};

// Fetch single book
export const fetchSingleBook = async (id) => {
    try 
    {
        const response = await client.get(`/book/${id}`);
        return response.data;
    } 
    catch(error) 
    {
        return error.message;
    }
};