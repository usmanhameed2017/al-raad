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
    // Validate id
    const id = request.params?.id;
    if(!id) throw new ApiError(404, "Video ID is missing");
    if(!isValidObjectId(id)) throw new ApiError(400, "Invalid MongoDB ID");

    try 
    {
        // Find video
        const video = await Video.findById(id);
        if(!video) throw new ApiError(404, "Video not found");
        return response.status(200).json(new ApiResponse(200, video, "Video has been fetched successfully"));
    } 
    catch (error) 
    {
        throw new ApiError(404, error.message);
    }
};

// Update video
const updateVideo = async (request, response) => {
    const uploadedVideo = request.file?.path || "";

    // Validate id
    const id = request.params?.id;
    if(!id) 
    {
        deleteFromTemp(uploadedVideo);
        throw new ApiError(404, "Video ID is missing");
    }
    if(!isValidObjectId(id)) 
    {
        deleteFromTemp(uploadedVideo);
        throw new ApiError(400, "Invalid MongoDB ID");
    }

    try 
    {
        // Find video
        const video = await Video.findById(id);
        if(!video)
        {
            deleteFromTemp(uploadedVideo);
            throw new ApiError(404, "Video not found");
        }

        // Get old video url
        const oldVideo = video?.url || "";

        // If new video uploaded
        if(uploadedVideo)
        {
            request.body.url = await uploadOnCloudinary(uploadedVideo, "video", "videos");
            await deleteFromCloudinary(oldVideo, "video", "videos");
        }
        else
        {
            request.body.url = oldVideo;
        }

        // Update video
        const updatedVideo = await Video.findByIdAndUpdate(id, request.body, { new:true });
        return response.status(200).json(new ApiResponse(200, updatedVideo, "Video has been updated successfully"));
    } 
    catch (error) 
    {
        deleteFromTemp(uploadedVideo);
        throw new ApiError(404, error.message);
    }
};

module.exports = { createVideo, fetchVideos, fetchSingleVideo, updateVideo };