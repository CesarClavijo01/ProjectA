const { User } = require("../../models");

async function getUserByIdService(data) {
    const {
        userId
    } = data;

    try {

        const user = await User.findByPk(userId);
        if (!user) {
            const clientError = {
                name: "UserNotFound",
                message: "User not found.",
                statusCode: 404
            };
            throw clientError;
        };
        return user;

    } catch (error) {
        // If it is a client error, throw it
        if (error.statusCode) throw error;

        // If not, log it
        console.error(error);

        // Throw server error
        const serverError = {
            name: "InternalServer",
            message: "Error while fetching user.",
            statusCode: 500
        };
        throw serverError;
    };
};

module.exports = getUserByIdService;