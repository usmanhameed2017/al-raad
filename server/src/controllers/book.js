const Book = require("../models/book");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const { deleteFromTemp, uploadOnCloudinary } = require("../utils/cloudinary");

// Create book
const createBook = async (request, response) => {
    const pdf = request.files?.pdf?.[0]?.path || "";
    const coverImage = request.files?.coverImage?.[0]?.path || "";

    // Validate Book title
    if(!request.body.title.trim()) 
    {
        deleteFromTemp(pdf, coverImage);
        throw new ApiError(400, "Book title is required");
    }

    // Validate pdf field
    if(!pdf.trim()) 
    {
        deleteFromTemp(pdf, coverImage);
        throw new ApiError(400, "Please upload pdf");
    }

    try 
    {
        request.body.pdf = await uploadOnCloudinary(pdf, "raw");
        request.body.coverImage = await uploadOnCloudinary(coverImage);

        const book = await Book.create(request.body);
        return response.status(201).json(new ApiResponse(201, book, "A new book has been created successfully"));
    } 
    catch(error) 
    {
        deleteFromTemp(pdf, coverImage);
        throw new ApiError(500, error.message);
    }
};

module.exports = { createBook };