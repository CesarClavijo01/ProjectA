const successResponse = ({

    statusCode,
    message = "Success.",
    data = null,
    
}) => {

    const response = {
        error: false,
        statusCode,
        message
    };
    if (data) response.data = data;
    return response;

};

module.exports = successResponse;