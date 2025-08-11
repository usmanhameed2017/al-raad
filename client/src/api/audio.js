import axios from 'axios';
import { axiosOptions, backendURL } from '../constants';
import { ApiResponse } from '../utils/ApiResponse';
import { ApiError } from '../utils/ApiError';

// Fetch all audios
export const fetchAllAudios = async (currentPage) => {
    try 
    {
        const response = await axios.get(`${backendURL}/audio?page=${currentPage}`, axiosOptions);
        return ApiResponse(response).data;
    } 
    catch(error) 
    {
        return ApiError(error).message;
    }
};

// Fetch single audio
export const fetchSingleAudio = async (id) => {
    try 
    {
        const response = await axios.get(`${backendURL}/audio/${id}`, axiosOptions);
        return ApiResponse(response).data;
    } 
    catch(error) 
    {
        return ApiError(error).message;
    }
};