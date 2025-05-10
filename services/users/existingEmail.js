const { User } = require("../../models");

async function existingEmailService(data) {
    /*
        Searches the database for a user with a provided email, errors if there is one.
        data = {
            email: "providedEmail"
        };
    */

    const { email } = data;

    try {
        // Find existing user
        const existing = await User.scope("id").findOne({ where: { email } });
        // If exists
        if (existing) {
            // Error out
            const clientError = {
                name: "ExistingEmail",
                message: "Email already in use.",
                statusCode: 400
            };
            throw clientError;
        };
        // Return nothing
        return;

    } catch (error) {
        // If it is a client error, throw it
        if (error.statusCode) throw error;

        // If not, log it
        console.error(error);

        // Throw server error
        const serverError = {
            name: "InternalServer",
            message: "Error while verifying unique email.",
            statusCode: 500
        };
        throw serverError;
    };
};

module.exports = existingEmailService;