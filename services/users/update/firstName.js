const config = require("../config.json");
const { validateField } = require("../../../regex");
const getUserByIdService = require("../getById");

async function updateFirstNameService(data) {
    // Grab the data
    const {
        userId,
        firstName
    } = data;

    // Verify supplied first name
    if (!firstName || typeof (firstName) !== "string") {
        const clientError = {
            name: "MissingFirstName",
            message: "Supply a first name.",
            statusCode: 400
        };
        throw clientError;
    };

    // Validate first name
    validateField("FirstName", firstName, null, config.firstName);

    try {

        // Grab user to update
        const user = await getUserByIdService({ userId });

        // Check duplicate first name
        if (firstName === user.firstName) {
            const clientError = {
                name: "SameFirstName",
                message: "First name must be different.",
                statusCode: 400
            };
            throw clientError;
        };

        // Update the user
        user.firstName = firstName;
        await user.save();

        // Return updated first name
        return user.toJSON();

    } catch (error) {
        // If it is a client error, throw it
        if (error.statusCode) throw error;

        // If not, log it
        console.error(error);

        // Throw server error
        const serverError = {
            name: "InternalServer",
            message: "Error while updating first name.",
            statusCode: 500
        };
        throw serverError;
    };
};

module.exports = updateFirstNameService;