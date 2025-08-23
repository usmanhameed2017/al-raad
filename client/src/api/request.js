import client from '../utils/axios';

// Get request
export const getRequest = async (url) => {
    try 
    {
        const response = await client.get(url);
        return response;
    } 
    catch(error) 
    {
        return error;
    }
};

// Post request
export const postRequest = async (url, payload, fileAttachment = false) => {
    try 
    {
        let options = {};
        if(fileAttachment) options = { headers: { "Content-Type": "multipart/form-data" } };
        const response = await client.post(url, payload, options);
        return response;
    } 
    catch(error) 
    {
        return error;
    }
};