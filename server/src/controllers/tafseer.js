const Tafseer = require("../models/tafseer");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const { isValidObjectId } = require("mongoose");

// Create tafseer
const createTafseer = async (request, response) => {
    try 
    {
        request.body.uploadedBy = request.user?._id;
        const tafseer = await Tafseer.create(request.body);
        return response.status(201).json(new ApiResponse(201, tafseer, "Tafseer has been uploaded successfully"));
    } 
    catch (error) 
    {
        throw new ApiError(500, error.message);
    }
};

// Fetch all tafseers
const fetchTafseers = async (request, response) => {
    const { page=1, limit=10 } = request.query;

    // Paging options
    const options = {
        page:parseInt(page),
        limit:parseInt(limit),
        sort: { createdAt: -1 }
    };    

    try 
    {
        const result = await Tafseer.paginate({}, options);
        // If page size is greater than total pages
        if(page > result.totalPages) throw new ApiError(404, "User not found");

        return response.status(200).json(new ApiResponse(200, result, "All tafseers has been fetched successfully"));        
    } 
    catch (error) 
    {
        throw new ApiError(404, error.message);
    }
};

// Fetch single tafseer
const fetchSingleTafseer = async (request, response) => {
    const id = request.params?.id || null;
    if(!id) throw new ApiError(404, "Tafseer ID is missing");
    if(!isValidObjectId(id)) throw new ApiError(400, "Invalid mongodb ID");

    try 
    {
        const tafseer = await Tafseer.findById(id);
        if(!tafseer) throw new ApiError(404, "Tafseer not found");
        return response.status(200).json(new ApiResponse(200, tafseer, "Tafseer has been fetched successfully"));
    }
    catch(error) 
    {
        throw new ApiError(500, error.message);
    }
};

// Update tafseer
const updateTafseer = async (request, response) => {
    const id = request.params?.id || null;
    if(!id) throw new ApiError(404, "Tafseer ID is missing");
    if(!isValidObjectId(id)) throw new ApiError(400, "Invalid mongodb ID");

    try 
    {
        const tafseer = await Tafseer.findByIdAndUpdate(id, request.body, { new:true });
        if(!tafseer) throw new ApiError(404, "Tafseer not found");
        return response.status(200).json(new ApiResponse(200, tafseer, "Tafseer has been updated successfully"));
    }
    catch(error) 
    {
        throw new ApiError(500, error.message);
    }
};

module.exports = { createTafseer, fetchTafseers, fetchSingleTafseer, updateTafseer };