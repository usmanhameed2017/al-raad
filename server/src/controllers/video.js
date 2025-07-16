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

// Fetch all videos
const fetchVideos = async (request, response) => {
    const { page = 1, limit = 10 } = request.query;

    // Paging options
    const options = {
        page:parseInt(page),
        limit:parseInt(limit),
        sort: { createdAt: -1 },
    };

    try 
    {
        // Execute query
        const result = await Video.paginate({}, options);

        // If page size is greater than total pages
        if(page > result.totalPages) throw new ApiError(404, "Video not found");

        return response.status(200).json(new ApiResponse(200, result, "All videos has been fetched successfully"));
    } 
    catch(error) 
    {
        throw new ApiError(404, error.message);
    }
};

// Fetch single video
const fetchSingleVideo = async (request, response) => {
    const id = request.params?.id;
    if(!id) throw new ApiError(404, "Video ID is missing");
    if(!isValidObjectId(id)) throw new ApiError(400, "Invalid MongoDB ID");

    try 
    {
        const video = await Video.findById(id);
        if(!video) throw new ApiError(404, "Video not found");
        return response.status(200).json(new ApiResponse(200, video, "Video has been fetched successfully"));
    } 
    catch (error) 
    {
        throw new ApiError(404, error.message);
    }
};

module.exports = { createVideo, fetchVideos, fetchSingleVideo };