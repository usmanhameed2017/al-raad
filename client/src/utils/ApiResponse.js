export const ApiResponse = (response) => {
    const { data, message, statusCode, success } = response.data;
    return { data, message, statusCode, success };
};