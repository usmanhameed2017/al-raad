const Book = require("../models/book");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const { isValidObjectId } = require("mongoose");
const { deleteFromTemp, uploadOnCloudinary, deleteFromCloudinary } = require("../utils/cloudinary");

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
        const pdfUrl = await uploadOnCloudinary(pdf, "raw", "pdf");
        request.body.pdf = pdfUrl.replace("/upload/", "/upload/fl_attachment/"); // Download pdf forcefully
        request.body.coverImage = await uploadOnCloudinary(coverImage, "image", "images");

        const book = await Book.create(request.body);
        return response.status(201).json(new ApiResponse(201, book, "A new book has been created successfully"));
    } 
    catch(error) 
    {
        deleteFromTemp(pdf, coverImage);
        throw new ApiError(500, error.message);
    }
};

// Fetch all books
const fetchBooks = async (request, response) => {
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
        const result = await Book.paginate({}, options);

        // If page size is greater than total pages
        if(page > result.totalPages) throw new ApiError(404, "Book not found");

        return response.status(200).json(new ApiResponse(200, result, "All books has been fetched successfully"));
    } 
    catch(error) 
    {
        throw new ApiError(404, error.message);
    }
};

// Fetch single book
const fetchSingleBook = async (request, response) => {
    const id = request.params?.id;
    if(!id) throw new ApiError(404, "Book ID is missing");
    if(!isValidObjectId(id)) throw new ApiError(400, "Invalid MongoDB ID");

    try 
    {
        const book = await Book.findById(id);
        if(!book) throw new ApiError(404, "Book not found");
        return response.status(200).json(new ApiResponse(200, book, "Book has been fetched successfully"));
    } 
    catch (error) 
    {
        throw new ApiError(404, error.message);
    }
};

// Edit book
const editBook = async (request, response) => {
    // Get uploaded file's url
    const uploadedPdf = request.files?.pdf?.[0]?.path || "";
    const uploadedCoverImage = request.files?.coverImage?.[0]?.path || "";

    // Validate id
    const id = request.params?.id;
    if(!id) 
    {
        deleteFromTemp(uploadedPdf, uploadedCoverImage);
        throw new ApiError(404, "Book ID is missing");
    }

    if(!isValidObjectId(id)) 
    {
        deleteFromTemp(uploadedPdf, uploadedCoverImage);
        throw new ApiError(400, "Invalid MongoDB ID");
    }

    try 
    {
        
        const book = await Book.findById(id);
        if(!book)
        {
            deleteFromTemp(uploadedPdf, uploadedCoverImage);
            throw new ApiError(404, "Book not found");     
        }

        // Get old file's url
        const oldPdf = book?.pdf || "";
        const oldCoverImage = book?.coverImage || "";

        // If new files uploaded
        if(uploadedPdf) 
        {
            const pdfUrl = await uploadOnCloudinary(uploadedPdf, "raw", "pdf");
            request.body.pdf = pdfUrl?.replace("/upload/", "/upload/fl_attachment/"); // Download pdf forcefully

            const updatedPdfUrl = oldPdf.replace("/upload/fl_attachment/", "/upload/");
            await deleteFromCloudinary(updatedPdfUrl, "raw", "pdf"); // Delete from cloudinary
        }
        else
        {
            request.body.pdf = oldPdf;
        }

        if(uploadedCoverImage)
        {
            request.body.coverImage = await uploadOnCloudinary(uploadedCoverImage, "image", "images");
            await deleteFromCloudinary(oldCoverImage, "image", "images"); // Delete from cloudinary
        }
        else
        {
            request.body.coverImage = oldCoverImage;
        }

        // Update book
        const updateBook = await Book.findByIdAndUpdate(id, request.body, { new:true });
        return response.status(200).json(new ApiResponse(200, updateBook, "Book has been updated"));
    } 
    catch (error) 
    {
        deleteFromTemp(uploadedPdf, uploadedCoverImage);
        throw new ApiError(404, error.message);
    }

};

module.exports = { createBook, fetchBooks, fetchSingleBook, editBook };