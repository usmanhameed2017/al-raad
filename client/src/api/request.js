import client from '../utils/axios';
import { startLoading, startSaving, stopLoading, stopSaving } from '../utils/loadingManager';
import { showSuccess, showError } from '../utils/toasterMessage';

// Get request
export const getRequest = async (url, enableSuccessMessage = false, enableErrorMessage = false) => {
    startLoading();
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
    finally
    {
        stopLoading();
    }
};

// Post request
export const postRequest = async (url, payload, fileAttachment = false, enableSuccessMessage = true, enableErrorMessage = true) => {
    startSaving();
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
    finally
    {
        stopSaving();
    }
};

// Put request
export const putRequest = async (url, payload, fileAttachment = false, enableSuccessMessage = true, enableErrorMessage = true) => {
    startSaving();
    try 
    {
        let options = {};
        if(fileAttachment) options = { headers: { "Content-Type": "multipart/form-data" } };
        const response = await client.put(url, payload, options);
        if(enableSuccessMessage) showSuccess(response.message);
        return response;
    } 
    catch(error) 
    {
        if(enableErrorMessage) showError(error.message);
        throw error;
    }
    finally
    {
        stopSaving();
    }
};

// Patch request
export const patchRequest = async (url, payload, fileAttachment = false, enableSuccessMessage = true, enableErrorMessage = true) => {
    startSaving();
    try 
    {
        let options = {};
        if(fileAttachment) options = { headers: { "Content-Type": "multipart/form-data" } };
        const response = await client.patch(url, payload, options);
        if(enableSuccessMessage) showSuccess(response.message);
        return response;
    } 
    catch(error) 
    {
        if(enableErrorMessage) showError(error.message);
        throw error;
    }
    finally
    {
        stopSaving();
    }
};

// Delete request
export const deleteRequest = async (url, enableSuccessMessage = true, enableErrorMessage = true) => {
    startSaving();
    try 
    {
        const response = await client.delete(url);
        if(enableSuccessMessage) showSuccess(response.message);
        return response;
    } 
    catch(error) 
    {
        if(enableErrorMessage) showError(error.message);
        throw error;
    }
    finally
    {
        stopSaving();
    }
};