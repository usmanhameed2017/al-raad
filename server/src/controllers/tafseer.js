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

module.exports = { createTafseer };