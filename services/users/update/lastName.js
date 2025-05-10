const config = require("../config.json");
const { validateField } = require("../../../regex");
const getUserByIdService = require("../getById");

async function updateLastNameService(data) {
    // Grab the data
    const {
        userId,
        lastName
    } = data;

    // Verify supplied last name
    if (!lastName || typeof (lastName) !== "string") {
        const clientError = {
            name: "MissingLastName",
            message: "Supply a last name.",
            statusCode: 400
        };
        throw clientError;
    };

    // Validate last name
    validateField("LastName", lastName, null, config.firstName);

    try {

        // Grab user to update
        const user = await getUserByIdService({ userId });

        // Check duplicate last name
        if (lastName === user.lastName) {
            const clientError = {
                name: "SameFirstName",
                message: "Last name must be different.",
                statusCode: 400
            };
            throw clientError;
        };

        // Update the user
        user.lastName = lastName;
        await user.save();

        // Return updated user
        return user.toJSON();

    } catch (error) {
        // If it is a client error, throw it
        if (error.statusCode) throw error;

        // If not, log it
        console.error(error);

        // Throw server error
        const serverError = {
            name: "InternalServer",
            message: "Error while updating last name.",
            statusCode: 500
        };
        throw serverError;
    };
};

module.exports = updateLastNameService;