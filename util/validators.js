const { test } = require('../regex');
const responses = require('../responses');

// Takes in a field name, the requested value for it, and it's configurations.
const validateField = (fieldName, fieldValue, config) => {
    // Tests the value under it's configurations to make sure it meets.
    const response = test({ stringToTest: fieldValue, ...config });
    if (response && response.error) {
        return responses.error({
            name: `Invalid${fieldName}`,
            message: response.message
        });
    };
    return null; // No error, return null
};

// Same thing, but adds confirmation. (confirm email)
const validateFieldWithConfirmation = (fieldName, fieldValue, confirmedValue, config) => {
    const response = test({ stringToTest: fieldValue, confirmed: confirmedValue, ...config });
    if (response && response.error) {
        return responses.error({
            name: `Invalid${fieldName}`,
            message: response.message
        });
    };
    return null; // No error, return null
};

module.exports = {
    validateField,
    validateFieldWithConfirmation
};