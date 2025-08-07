import axios from 'axios';
import { axiosOptions, backendURL } from '../constants';
import { ApiResponse } from '../utils/ApiResponse';
import { ApiError } from '../utils/ApiError';

// Fetch all videos
export const fetchAllVideos = async (currentPage) => {
    try 
    {
        const response = await axios.get(`${backendURL}/video?page=${currentPage}`, axiosOptions);
        return ApiResponse(response).data;
    } 
    catch(error) 
    {
        return ApiError(error).message;
    }
};

// Fetch single video
export const fetchSingleVideo = async (id) => {
    try 
    {
        const response = await axios.get(`${backendURL}/video/${id}`, axiosOptions);
        return ApiResponse(response).data;
    } 
    catch(error) 
    {
        return ApiError(error).message;
    }
};