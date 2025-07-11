const Tafseer = require("../models/tafseer");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");

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

module.exports = { createTafseer, fetchTafseers };