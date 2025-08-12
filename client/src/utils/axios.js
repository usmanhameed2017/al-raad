import axios from "axios";
import { backendURL } from "../constants";
import { ApiError } from "./ApiError";
import { ApiResponse } from "./ApiResponse";

// Create instance
const api = axios.create({
    baseURL: backendURL,
    withCredentials: true,
    withXSRFToken: true, 
    xsrfCookieName: '_csrf', 
    xsrfHeaderName: 'CSRF-Token'
});

// Request interceptor
api.interceptors.request.use((request) => {
    console.log("Data janay se pehle k halaat");
    return request;
}, (error) => {
    return Promise.reject(ApiError(error));
});

// Response interceptor
api.interceptors.response.use((response) => {
    return ApiResponse(response);
}, (error) => {
    return Promise.reject(ApiError(error));
});

export default api;