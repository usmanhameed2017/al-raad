export const ApiError = (error) => {
    const data = error?.response?.data || null;
    const success = data?.success || false;
    const message = data?.message || "An unknown error occur";
    const statusCode = error?.response?.status || null;
    const stack = error?.stack || null;
    return { data, message, success, statusCode, stack };
};