const { RoleHierarchy, UserRole } = require("../../models");

async function assignChildrenRolesService(data) {
    const {
        userId,
        parentId,
    } = data;

    try {
        const childRoles = await RoleHierarchy.findAll({
            where: { parentId }
        });

        const addedRoles = []
        for (const childRole of childRoles) {
            const existingChild = await UserRole.scope("id").findOne({
                where: { userId, roleId: childRole.childId }
            });

            if (!existingChild) {
                await UserRole.create({ userId, roleId: childRole.childId });
                addedRoles.push(childRole)
            };

            await assignChildrenRolesService({ userId, parentId: childRole.childId });
        };

        return addedRoles;
    } catch (error) {
        // Log the error
        console.error(error);

        // Throw a server error
        const serverError = {
            name: "InternalServer",
            message: "Error while assigning children roles.",
            statusCode: 500
        };
        throw serverError;
    };
};

module.exports = assignChildrenRolesService;