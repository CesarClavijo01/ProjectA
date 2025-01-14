const config = require("../config.json");
const { validateField } = require("../../../regex");
const getUserByIdService = require("../getById");
const existingUsernameService = require("../existingUsername");

async function updateUsernameService(data) {
    // Grab the data
    const {
        userId,
        username
    } = data;

    // Verify supplied username
    if (!username || typeof (username) !== "string") {
        const clientError = {
            name: "MissingUsername",
            message: "Supply a username.",
            statusCode: 400
        };
        throw clientError;
    };

    // Validate username
    validateField("Username", username, null, config.username);

    try {

        // Grab user to update
        const user = await getUserByIdService({ userId });

        // Check duplicate username
        if (username === user.username) {
            const clientError = {
                name: "SameUsername",
                message: "Username must be different.",
                statusCode: 400
            };
            throw clientError;
        };

        // Check existing username
        await existingUsernameService(data);

        // Update the user
        user.username = username;
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
            message: "Error while updating username.",
            statusCode: 500
        };
        throw serverError;
    };
};

module.exports = updateUsernameService;