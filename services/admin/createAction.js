const { AdminAction } = require("../../models");
const { checkMissingFields } = require("../../util");

async function createActionService(data){
    const {
        adminId,
        action,
        details
    } = data;

    checkMissingFields({ adminId, action, details })

    try {

        await AdminAction.create({
            adminId,
            action,
            details
        });

        return;

    } catch (error) {
        // If it is a client error, throw it
        if (error.statusCode) throw error;

        // If not, log it
        console.error(error);

        // Throw server error
        const serverError = {
            name: "InternalServer",
            message: "Error while creating an admin action.",
            statusCode: 500
        };
        throw serverError;
    }
};

module.exports = createActionService;