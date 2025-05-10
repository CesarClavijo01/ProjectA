const { User } = require("../../../models");
const { checkMissingFields } = require("../../../util");
const createActionService = require("../createAction");

async function recoverUserService(data) {
    const { userId, adminId } = data;

    checkMissingFields({ userId });

    try {
        const user = await User.scope('delete').findOne({
            where: { id: userId },
            paranoid: false,
        });

        if (!user) {
            const clientError = {
                statusCode: 404,
                name: "UserNotFound",
                message: "User not found or already expired."
            };
            throw clientError;
        };

        if (!user.deletedAt) {
            const clientError = {
                name: "UserNotDeleted",
                message: "User is not soft-deleted and already active.",
                statusCode: 400
            };
            throw clientError;
        };

        await createActionService({
            adminId,
            action: "Recovered user",
            details: `userId: ${userId}`
        });

        await user.restore();

        return user.toJSON();

    } catch (error) {
        // Log the error
        console.error(error);

        // Throw a server error
        const serverError = {
            name: "InternalServer",
            message: "Error while recovering user with admin permissions.",
            statusCode: 500
        };
        throw serverError;
    }
};

module.exports = recoverUserService;