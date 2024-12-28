const errorResponse = ({

    name = "",
    message = "There was an error.",
    data = null

}) => {

    response = { error: true, name: `${name}Error`, message }
    if (data) response.data = data
    return response

};

module.exports = errorResponse;