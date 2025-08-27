import * as Yup from 'yup';
import { allowedImageTypes } from '../constants';

// Image type checker
const imageTypeChecker = (value) => !value || allowedImageTypes.includes(value?.type);

// Image size checker
const imageSizeChecker = (value) => !value || value.size && value.size <= 5000000

// Update password validation
export const updatePasswordValidation = Yup.object({
    oldPassword:Yup.string()
    .required('Old password is required'),

    newPassword:Yup.string()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, "Enter strong password")
    .required('New password is required'),

    confirmPassword:Yup.string()
    .oneOf([Yup.ref('newPassword'), null], "New password & confirm password must be identical")
    .required('Confirm password is required'),
});

// Forgot password validation 
export const forgotPasswordValidation = Yup.object({
    email:Yup.string()
    .lowercase()
    .email('Invalid email')
    .required("Email is required")
});

// Reset password validation
export const resetPasswordValidation = Yup.object({
    newPassword:Yup.string()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, "Enter strong password")
    .required('New password is required'),

    confirmPassword:Yup.string()
    .oneOf([Yup.ref('newPassword'), null], "New password & confirm password must be identical")
    .required('Confirm password is required'),
});