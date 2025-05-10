const config = require("../config.json");
const { validateField } = require("../../../regex");
const getUserByIdService = require("../getById");
const existingEmailService = require("../existingEmail");

async function updateEmailService(data) {
    // Grab the data
    const {
        userId,
        reqEmail,
        conEmail
    } = data;

    // Verify supplied email
    if (!reqEmail || typeof (reqEmail) !== "string") {
        const clientError = {
            name: "MissingEmail",
            message: "Supply an email.",
            statusCode: 400
        };
        throw clientError;
    };

    // Validate email
    validateField("Email", reqEmail, conEmail, config.email);
    
    try {
        
        // Grab user to update
        const user = await getUserByIdService({ userId });

        // Check duplicate email
        if (reqEmail === user.email) {
            const clientError = {
                name: "SameEmail",
                message: "Email must be different.",
                statusCode: 400
            };
            throw clientError;
        };

        // Check existing email
        await existingEmailService({ email: reqEmail });

        // Update the user
        user.email = reqEmail;
        await user.save();

        // Return updated user
        return { ...user.toJSON(), email: reqEmail };

    } catch (error) {
        // If it is a client error, throw it
        if (error.statusCode) throw error;

        // If not, log it
        console.error(error);

        // Throw server error
        const serverError = {
            name: "InternalServer",
            message: "Error while updating email.",
            statusCode: 500
        };
        throw serverError;
    };
};

module.exports = updateEmailService;