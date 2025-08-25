import client from '../utils/axios';
import { showSuccess, showError } from '../utils/toasterMessage';

// Get request
export const getRequest = async (url, enableSuccessMessage = false, enableErrorMessage = false) => {
    try 
    {
        const response = await client.get(url);
        if(enableSuccessMessage) showSuccess(response.message);
        return response;
    } 
    catch(error) 
    {
        if(enableErrorMessage) showError(error.message);
        throw error;
    }
};

// Post request
export const postRequest = async (url, payload, fileAttachment = false, enableSuccessMessage = true, enableErrorMessage = true) => {
    try 
    {
        let options = {};
        if(fileAttachment) options = { headers: { "Content-Type": "multipart/form-data" } };
        const response = await client.post(url, payload, options);
        if(enableSuccessMessage) showSuccess(response.message);
        return response;
    } 
    catch(error) 
    {
        if(enableErrorMessage) showError(error.message);
        throw error;
    }
};