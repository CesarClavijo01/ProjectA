const { Sequelize } = require("../models")

const handleSeqErrors = (error) => {
    if (error instanceof Sequelize.DatabaseError) {
        const clientError = {
            name: "InternalServer",
            message: "Database error occurred.",
            statusCode: 500
        };
        throw clientError;
    };
    if (error instanceof Sequelize.ValidationError) {
        const clientError = {
            name: "InternalServer",
            message: "Validation error occurred.",
            statusCode: 400
        };
        throw clientError;
    };
    return;
};

module.exports = handleSeqErrors;