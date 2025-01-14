const test = require('./test')
const responses = require('../responses');

// Takes in a field name, the requested value for it, and it's configurations.
const validateField = (fieldName, fieldValue, valueToConfirm, config) => {
    // Tests the value under it's configurations to make sure it meets.
    try {
        test(fieldValue, valueToConfirm, config);
        return null; // No error, return null
    } catch (error) {
        console.log(error);
        error.name = `Invalid${fieldName}`;
        error.statusCode = 400;
        throw error;
    };
};

module.exports = validateField;