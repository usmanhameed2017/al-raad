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

// User setting validation
export const userSettingsValidation = Yup.object({
    name: Yup.string()
    .min(3, "Name must be at least 3 characters long")
    .max(20, "Name must not be longer than 20 characters")
    .required("Name is required"),

    username: Yup.string()
    .lowercase()
    .required("Username is required"),

    password: Yup.string()
    .nullable()
    .test("is-strong-password","Enter strong password", (value) => {
            if (!value) return true; // empty allowed
            return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(value);
        }
    ),

    cpassword: Yup.string()
    .nullable()
    .when("password", {
        is: (val) => val && val.length > 0,
        then: (schema) =>
            schema
            .required("Confirm password is required")
            .oneOf([Yup.ref("password")], "Password & confirm password must be identical"),
        otherwise: (schema) => schema.notRequired(),
    }),
});