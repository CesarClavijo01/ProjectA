const getMissingFields = (requiredFields) => {
    /*
    Take in an object
        Keys are the field name
        Values are what was passed in for the field
    */
    const missingFields = [];
    
    for (const [field, value] of Object.entries(requiredFields)) {
        if (!value || value.trim() === '') {
            missingFields.push(field);
        };
    };
    // if all values are filled, returns an empty array.
    return missingFields
}

module.exports = getMissingFields;