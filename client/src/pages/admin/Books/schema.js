import * as Yup from "yup";

// Form values
export const addBookInitialValues = {
    title: '',
    description: '',
    pdf: ''
};

// Allowed file type (only PDF)
export const allowedFileTypes = ["application/pdf"];

// File type checker
const fileTypeChecker = (value) => !value || allowedFileTypes.includes(value?.type);

// File size checker (max 9MB)
const fileSizeChecker = (value) => !value || (value.size && value.size <= 9000000);

// Add book validation
export const addBookValidation = Yup.object({
    // Title
    title: Yup.string()
    .min(3, "Title must be at least 3 characters long")
    .max(30, "Title must not be longer than 30 characters")
    .required("Title is required"),

    // Description
    description: Yup.string()
    .min(3, "Description must be at least 3 characters long")
    .max(500, "Description must not be longer than 500 characters")
    .required("Description is required"),
    
    // PDF
    pdf:Yup.mixed()
    .test('type', "Invalid file format! Only PDF is allowed", fileTypeChecker)
    .test('size', "PDF size must not be larger than 9MB", fileSizeChecker)
});