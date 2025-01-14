const { RoleHierarchy } = require("../../models");

async function removeParentRolesService({ userId, childId }) {
    try {
        const parentRoles = await RoleHierarchy.findAll({
            where: { childId }
        });

        for (const parentRole of parentRoles) {
            const existingUserRole = await UserRole.scope("id").findOne({
                where: { userId, roleId: parentRole.parentId }
            })

            if (existingUserRole) {
                await existingUserRole.destroy();
            };

            await removeParentRoles({ userId, childId: parentRole.parentId })
        };
    } catch (error) {
        // Log the error
        console.error(error);

        // Throw a server error
        const serverError = {
            name: "InternalServer",
            message: "Error while removing parent roles.",
            statusCode: 500
        };
        throw serverError;
    };
};

module.exports = removeParentRolesService;