import axios from "axios";
import { backendURL } from "../constants";
import { ApiError } from "./ApiError";
import { ApiResponse } from "./ApiResponse";

// Create instance
const client = axios.create({
    baseURL: backendURL,
    withCredentials: true,
    withXSRFToken: true, 
    xsrfCookieName: '_csrf',
    xsrfHeaderName: 'CSRF-Token'
});

// Request interceptor
client.interceptors.request.use((request) => {
    const csrfToken = localStorage.getItem("csrfToken");     // Get CSRF-Token
    if(csrfToken) request.headers["CSRF-Token"] = csrfToken; // Inject token in header
    return request;
}, (error) => {
    return Promise.reject(error);
});

// Response interceptor
client.interceptors.response.use((response) => {
    return ApiResponse(response);
}, (error) => {
    return Promise.reject(ApiError(error));
});

export default client;