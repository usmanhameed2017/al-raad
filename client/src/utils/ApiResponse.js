export const ApiResponse = (response) => {
    const { data, message, statusCode, success } = response.data;

    // Get headers
    const headers = response.headers;

    return { data, message, statusCode, success, headers };
};