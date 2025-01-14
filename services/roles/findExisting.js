const { UserRole } = require("../../models");

async function findExistingRoleService(data) {
    const {
        userId,
        roleId
    } = data;

    try {

        const existing = await UserRole.findOne({
            where: {
                userId,
                roleId
            }
        });
        return existing;

    } catch (error) {
        // log error
        console.error(error);

        // Throw server error
        const serverError = {
            name: "InternalServer",
            message: "Error while finding existing role.",
            statusCode: 500
        };
        throw serverError;
    };
};

module.exports = findExistingRoleService;