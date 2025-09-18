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

        // Payload with uploader name
        const addedTafseer = await Tafseer.findById(tafseer?._id).populate("uploadedBy", "name");
        request.io.emit("TafseerAdded", addedTafseer);
        return response.status(201).json(new ApiResponse(201, tafseer, "Tafseer has been uploaded successfully"));
    } 
    catch(error)
    {
        throw error;
    }
};

// Fetch all tafseers
const fetchTafseers = async (request, response) => {
    const { page = 1, limit = 10, search = "" } = request.query;

    // Paging options
    const options = {
        page:parseInt(page),
        limit:parseInt(limit),
        sort: { createdAt: -1 },
        populate: { path:"uploadedBy", select:"name" }
    };    

    try 
    {
        let query = {};

        // If search keyword provided
        if (search && search.trim() !== "") 
        {
            query = {
                $or: [
                    { surahName: { $regex: search.trim(), $options: "i" } },
                    { ayah: { $regex: search.trim(), $options: "i" } }
                ]
            };
        }

        // Execute query
        const result = await Tafseer.paginate(query, options);

        // If page size is greater than total pages
        if(page > result.totalPages) throw new ApiError(404, "Tafseer not found");

        return response.status(200).json(new ApiResponse(200, result, "All tafseers has been fetched successfully"));        
    } 
    catch(error)
    {
        throw error;
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
        throw error;
    }
};

// Update tafseer
const updateTafseer = async (request, response) => {
    const id = request.params?.id || null;
    if(!id) throw new ApiError(404, "Tafseer ID is missing");
    if(!isValidObjectId(id)) throw new ApiError(400, "Invalid mongodb ID");

    try 
    {
        const tafseer = await Tafseer.findByIdAndUpdate(id, request.body, { new:true }).populate("uploadedBy", "name");
        if(!tafseer) throw new ApiError(404, "Tafseer not found");
        request.io.emit("TafseerUpdated", tafseer);
        return response.status(200).json(new ApiResponse(200, tafseer, "Tafseer has been updated successfully"));
    }
    catch(error) 
    {
        throw error;
    }
};

// Delete tafseer
const deleteTafseer = async (request, response) => {
    const id = request.params?.id || null;
    if(!id) throw new ApiError(404, "Tafseer ID is missing");
    if(!isValidObjectId(id)) throw new ApiError(400, "Invalid mongodb ID");

    try 
    {
        const tafseer = await Tafseer.findByIdAndDelete(id);
        if(!tafseer) throw new ApiError(404, "Tafseer not found");
        request.io.emit("TafseerDeleted", id);
        return response.status(200).json(new ApiResponse(200, tafseer, "Tafseer has been deleted successfully"));
    }
    catch(error) 
    {
        throw error;
    }
};

module.exports = { createTafseer, fetchTafseers, fetchSingleTafseer, updateTafseer, deleteTafseer };