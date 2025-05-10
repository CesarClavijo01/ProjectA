const { User } = require("../../models");

async function existingUsernameService(data) {
    /*
        Searches the database for a user with a provided username, errors if there is one.
        data = {
            username: "providedUsername"
        };
    */

    const { username } = data;

    try {
        // Find existing user
        const existing = await User.scope("id").findOne({ where: { username } });
        // If exists
        if (existing) {
            // Error out
            const clientError = {
                name: "ExistingUsername",
                message: "Username already in use.",
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
            message: "Error while verifying unique username.",
            statusCode: 500
        };
        throw serverError;
    };
};

module.exports = existingUsernameService;