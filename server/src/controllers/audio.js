const Audio = require("../models/audio");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const { isValidObjectId } = require("mongoose");
const { deleteFromTemp, uploadOnCloudinary, deleteFromCloudinary } = require("../utils/cloudinary");

// Create audio lecture
const createAudio = async (request, response) => {
    request.body.uploadedBy = request.user?._id;
    const audioUrl = request.file?.path || "";

    if(!request.body.title.trim())
    {
        deleteFromTemp(audioUrl);
        throw new ApiError(400, "Audio title is required");
    }

    if(!audioUrl.trim())
    {
        deleteFromTemp(audioUrl);
        throw new ApiError(400, "Audio is required");
    }
    
    try 
    {
        const uploadedUrl = await uploadOnCloudinary(audioUrl, "audio", "audios");
        if(!uploadedUrl)
        {
            deleteFromTemp(audioUrl);
            throw new ApiError(400, "Audio failed to upload on cloudinary");
        }

        request.body.url = uploadedUrl;
        const audio = await Audio.create(request.body);
        
        return response.status(201).json(new ApiResponse(201, audio, "A audio has been uploaded successfully"));
    } 
    catch (error) 
    {
        deleteFromTemp(audioUrl);
        throw new ApiError(500, error.message);
    }
};

// Fetch all audios
const fetchAudios = async (request, response) => {
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
        const result = await Audio.paginate({}, options);

        // If page size is greater than total pages
        if(page > result.totalPages) throw new ApiError(404, "Audio not found");

        return response.status(200).json(new ApiResponse(200, result, "All audios has been fetched successfully"));
    } 
    catch(error) 
    {
        throw new ApiError(404, error.message);
    }
};

// Fetch single audio
const fetchSingleAudio = async (request, response) => {
    // Validate id
    const id = request.params?.id;
    if(!id) throw new ApiError(404, "Audio Lecture ID is missing");
    if(!isValidObjectId(id)) throw new ApiError(400, "Invalid MongoDB ID");

    try 
    {
        // Find audio
        const audio = await Audio.findById(id);
        if(!audio) throw new ApiError(404, "Audio not found");
        return response.status(200).json(new ApiResponse(200, audio, "Audio has been fetched successfully"));
    } 
    catch (error) 
    {
        throw new ApiError(404, error.message);
    }
};

// Update audio
const updateAudio = async (request, response) => {
    const uploadedAudio = request.file?.path || "";

    // Validate id
    const id = request.params?.id;
    if(!id) 
    {
        deleteFromTemp(uploadedAudio);
        throw new ApiError(404, "Audio Lecture ID is missing");
    }
    if(!isValidObjectId(id)) 
    {
        deleteFromTemp(uploadedAudio);
        throw new ApiError(400, "Invalid MongoDB ID");
    }

    try 
    {
        // Find audio
        const audio = await Audio.findById(id);
        if(!audio)
        {
            deleteFromTemp(uploadedAudio);
            throw new ApiError(404, "Audio not found");
        }

        // Get old audio url
        const oldAudio = audio?.url || "";

        // If new audio uploaded
        if(uploadedAudio)
        {
            request.body.url = await uploadOnCloudinary(uploadedAudio, "audio", "audios");
            await deleteFromCloudinary(oldAudio, "audio", "audios");
        }
        else
        {
            request.body.url = oldAudio;
        }

        // Update audio
        const updatedAudio = await Audio.findByIdAndUpdate(id, request.body, { new:true });
        return response.status(200).json(new ApiResponse(200, updatedAudio, "Audio has been updated successfully"));
    } 
    catch (error) 
    {
        deleteFromTemp(uploadedAudio);
        throw new ApiError(404, error.message);
    }
};

// Delete audio
const deleteAudio = async (request, response) => {
    // Validate id
    const id = request.params?.id;
    if(!id) throw new ApiError(404, "Audio Lecture ID is missing");
    if(!isValidObjectId(id)) throw new ApiError(400, "Invalid MongoDB ID");

    try 
    {
        // Delete record
        const audio = await Audio.findByIdAndDelete(id);
        if(!audio) throw new ApiError(404, "Audio not found");

        // Delete audio from cloudinary
        await deleteFromCloudinary(audio?.url, "audio", "audios");
        return response.status(200).json(new ApiResponse(200, audio, "Audio has been deleted successfully"));
    } 
    catch (error) 
    {
        throw new ApiError(500, error.message);
    }    
};

module.exports = { createAudio, fetchAudios, fetchSingleAudio, updateAudio, deleteAudio };