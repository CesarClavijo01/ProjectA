const errorResponse = ({

    name = "",
    statusCode,
    message = "There was an error.",
    data = null

}) => {

    const response = {
        error: true,
        statusCode,
        name: `${name}Error`,
        message
    };
    if (data) response.data = data
    return response;

};

module.exports = errorResponse;