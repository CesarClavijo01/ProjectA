const successResponse = ({

    message = "",
    data = null,
    
}) => {

    const response = { error: false };
    if (message) response.message = message
    if (data) response.data = data;

    return response;

};

module.exports = successResponse;