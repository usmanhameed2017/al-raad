const Video = require("../models/video");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const { isValidObjectId } = require("mongoose");
const { deleteFromTemp, uploadOnCloudinary, deleteFromCloudinary } = require("../utils/cloudinary");

// Create video
const createVideo = async (request, response) => {
    request.body.uploadedBy = request.user?._id;
    const videoUrl = request.file?.path || "";

    if(!request.body.title.trim())
    {
        deleteFromTemp(videoUrl);
        throw new ApiError(400, "Video title is required");
    }

    if(!videoUrl.trim())
    {
        deleteFromTemp(videoUrl);
        throw new ApiError(400, "Video is required");
    }
    
    try 
    {
        request.body.url = await uploadOnCloudinary(videoUrl, "video", "videos")
        const video = await Video.create(request.body);
        
        return response.status(201).json(new ApiResponse(201, video, "A video has been uploaded successfully"));
    } 
    catch (error) 
    {
        deleteFromTemp(videoUrl);
        throw new ApiError(500, error.message);
    }
};

module.exports = { createVideo };