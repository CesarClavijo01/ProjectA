const { UserRole } = require("../../../models");
const { checkMissingFields } = require("../../../util");
const { getRoleByIdService, removeParentRolesService, findExistingRoleService } = require("../../roles");
const getUserByIdService = require("../../users/getById");
const createActionService = require("../createAction");

async function removeRoleService(data) {
    const { userId, adminId, roleId } = data;

    checkMissingFields(userId, roleId);

    try {
        const user = await getUserByIdService({ userId });
        const role = await getRoleByIdService({ roleId });
        const existingRole = await findExistingRoleService({ userId, roleId });
        if (!existingRole) {
            const clietError = {
                name: "RoleNotAssigned",
                message: "User does not have this role.",
                statusCode: 400
            };
            throw clietError;
        };

        await UserRole.destroy({
            where: { userId, roleId }
        });

        await removeParentRolesService({ userId, childId: roleId });

        await createActionService({
            adminId,
            action: "Removed user Role",
            details: `userId: ${userId}, roleId: ${roleId}`
        });

        return { user, role };

    } catch (error) {
        // If it is a client error, throw it
        if (error.statusCode) throw error;

        // If not, log it
        console.error(error);

        // Throw server error
        const serverError = {
            name: "InternalServer",
            message: "Error while removing role from user.",
            statusCode: 500
        };
        throw serverError;
    }
}

module.exports = removeRoleService;