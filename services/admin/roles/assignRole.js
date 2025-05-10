const { UserRole } = require("../../../models")
const { checkMissingFields } = require("../../../util");
const { getRoleByIdService, assignChildrenRolesService, findExistingRoleService } = require("../../roles");
const getUserByIdService = require("../../users/getById");
const createActionService = require("../createAction");

async function assignRoleService(data) {
    const {
        userId,
        adminId,
        roleId
    } = data;
    console.log(userId)
    checkMissingFields({ userId, roleId })

    try {

        const user = await getUserByIdService({ userId });
        const newRole = await getRoleByIdService({ roleId });
        const existingRole = await findExistingRoleService({ userId, roleId })
        if (existingRole) {
            const clientError = {
                name: "RoleAssigned",
                message: "User already has this role.",
                statusCode: 400
            };
            throw clientError;
        };
        await UserRole.create({
            userId,
            roleId
        });
        const otherRoles = await assignChildrenRolesService({ userId, parentId: roleId })
        await createActionService({
            adminId,
            action: "Assigned user role",
            details: `userId: ${userId}, roleId: ${roleId}`
        });
        return {
            user,
            roles: [newRole, ...otherRoles]
        };

    } catch (error) {
        // If it is a client error, throw it
        if (error.statusCode) throw error;

        // If not, log it
        console.error(error);

        // Throw server error
        const serverError = {
            name: "InternalServer",
            message: "Error while assigning role to user.",
            statusCode: 500
        };
        throw serverError;
    }
};

module.exports = assignRoleService;