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
        const uploadedUrl = await uploadOnCloudinary(videoUrl, "video", "videos");
        if(!uploadedUrl)
        {
            deleteFromTemp(videoUrl);
            throw new ApiError(400, "Video failed to upload on cloudinary");
        }

        request.body.url = uploadedUrl;
        const video = await Video.create(request.body);
        request.io.emit("Refresh Video"); 
        return response.status(201).json(new ApiResponse(201, video, "A video has been uploaded successfully"));
    } 
    catch(error)
    {
        deleteFromTemp(videoUrl);
        throw error;
    }
};

// Fetch all videos
const fetchVideos = async (request, response) => {
    const { page = 1, limit = 10, search = "" } = request.query;

    // Paging options
    const options = {
        page:parseInt(page),
        limit:parseInt(limit),
        sort: { createdAt: -1 },
        populate: { path: "uploadedBy", select: "name" }
    };

    try 
    {
        let query = {};

        // If search keyword provided
        if (search && search.trim() !== "") 
        {
            query = {
                $or: [
                    { title: { $regex: search.trim(), $options: "i" } },
                    { description: { $regex: search.trim(), $options: "i" } }
                ]
            };
        }

        // Execute query
        const result = await Video.paginate(query, options);

        // If page size is greater than total pages
        if(page > result.totalPages) throw new ApiError(404, "Video not found");

        return response.status(200).json(new ApiResponse(200, result, "All videos has been fetched successfully"));
    } 
    catch(error) 
    {
        throw error;
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
    catch(error)
    {
        throw error;
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
        request.io.emit("Refresh Video"); 
        return response.status(200).json(new ApiResponse(200, updatedVideo, "Video has been updated successfully"));
    } 
    catch(error)
    {
        deleteFromTemp(uploadedVideo);
        throw error;
    }
};

// Delete video
const deleteVideo = async (request, response) => {
    // Validate id
    const id = request.params?.id;
    if(!id) throw new ApiError(404, "Video ID is missing");
    if(!isValidObjectId(id)) throw new ApiError(400, "Invalid MongoDB ID");

    try 
    {
        // Delete record
        const video = await Video.findByIdAndDelete(id);
        if(!video) throw new ApiError(404, "Video not found");

        // Delete video from cloudinary
        await deleteFromCloudinary(video?.url, "video", "videos");
        request.io.emit("Refresh Video"); 
        return response.status(200).json(new ApiResponse(200, video, "Video has been deleted successfully"));
    } 
    catch(error)
    {
        throw error;
    }    
};

module.exports = { createVideo, fetchVideos, fetchSingleVideo, updateVideo, deleteVideo };