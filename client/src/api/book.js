import axios from 'axios';
import { axiosOptions, backendURL } from '../constants';
import { ApiResponse } from '../utils/ApiResponse';
import { ApiError } from '../utils/ApiError';

// Fetch all books
export const fetchAllBooks = async (currentPage) => {
    try 
    {
        const response = await axios.get(`${backendURL}/book?page=${currentPage}`, axiosOptions);
        return ApiResponse(response).data;
    } 
    catch(error) 
    {
        return ApiError(error).message;
    }
};

// Fetch single book
export const fetchSingleBook = async (id) => {
    try 
    {
        const response = await axios.get(`${backendURL}/book/${id}`, axiosOptions);
        return ApiResponse(response).data;
    } 
    catch(error) 
    {
        return ApiError(error).message;
    }
};