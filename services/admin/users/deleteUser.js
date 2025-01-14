const { checkMissingFields } = require("../../../util");
const { deleteAccountService } = require("../../users");
const createActionService = require("../createAction");

async function adminDeleteUserService(data) {
    const { userId, adminId } = data;

    checkMissingFields({ userId, adminId });

    try {
        await deleteAccountService({ userId });

        await createActionService({
            adminId,
            action: "Deleted user",
            details: `userId: ${userId}`
        });

        return;
        
    } catch (error) {
        // Log the error
        console.error(error);

        // Throw a server error
        const serverError = {
            name: "InternalServer",
            message: "Error while deleting user with admin permissions.",
            statusCode: 500
        };
        throw serverError;
    }
};

module.exports = adminDeleteUserService