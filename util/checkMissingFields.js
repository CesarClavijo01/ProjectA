const checkMissingFields = (requiredFields) => {
    /*
    Take in an object
        Keys are the field name
        Values are what was passed in for the field
    */
    const missingFields = [];
    console.log(requiredFields)
    for (const [field, value] of Object.entries(requiredFields)) {
        if (!value || value.trim() === '') {
            missingFields.push(field);
        };
    };
    if (missingFields.length > 0) {
        const clientError = {
            name: "MissingFields",
            message: "Missing required fields.",
            data: missingFields,
            statusCode: 400
        }
        throw clientError;
    }
    return;
}

module.exports = checkMissingFields;