import axios from 'axios';
import { axiosOptions, backendURL } from '../constants';
import { ApiResponse } from '../utils/ApiResponse';
import { ApiError } from '../utils/ApiError';

// Fetch all tafseers
export const fetchAllTafseers = async (currentPage) => {
    try 
    {
        const response = await axios.get(`${backendURL}/tafseer?page=${currentPage}`, axiosOptions);
        return ApiResponse(response).data;
    } 
    catch(error) 
    {
        return ApiError(error).message;
    }
};

// Fetch single tafseer
export const fetchSingleTafseer = async (id) => {
    try 
    {
        const response = await axios.get(`${backendURL}/tafseer/${id}`, axiosOptions);
        return ApiResponse(response).data;
    } 
    catch(error) 
    {
        return ApiError(error);
    }
};