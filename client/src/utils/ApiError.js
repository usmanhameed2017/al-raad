export const ApiError = (error) => {
    const data = error?.response?.data || null;
    const success = error?.response?.data?.success || null;
    const message = error?.response?.data?.message || null;
    return { data, message, success };
};