const { Op } = require("sequelize");
const responses = require("../../../responses");
const { User, Role, UserRole, RoleHierarchy } = require("../../../models");

const removeRole = async (req, res) => {
    const { userId, roleId } = req.body;

    try {
        // Check if user exists
        const user = await User.scope("id").findByPk(userId);
        if (!user) {
            return res.status(404).json(
                responses.error({
                    name: "UserNotFound",
                    message: "User not found."
                })
            );
        };

        // Check if role exists
        const role = await Role.scope("id").findByPk(roleId);
        if (!role) {
            return res.status(404).json(
                responses.error({
                    name: "RoleNotFound",
                    message: "Role not found."
                })
            );
        };

        // Fubd the UserRole with the given userId and roleId
        const existingUserRole = await UserRole.scope("id").findOne({
            where: {
                userId,
                roleId
            }
        });
        // Verify it exists
        if (!existingUserRole) {
            return res.status(400).json(
                responses.error({
                    name: "RoleNotAssigned",
                    message: "User does not have this role."
                })
            );
        };

        await UserRole.destroy({
            where: {
                userId,
                roleId
            }
        });

        const removeParentRoles = async (childId) => {
            // Find the parent roles of the current role
            const parentRoles = await RoleHierarchy.findAll({
                where: { childId }
            });

            // If there are parent roles, remove them and recurse
            for (const parentRole of parentRoles) {
                // Remove the link from RoleHierarchy
                const existingUserRole = await UserRole.scope('id').findOne({
                    where: { userId, roleId: parentRole.parentId }
                });

                // If the user has the parent role, remove it
                if (existingUserRole) {
                    await existingUserRole.destroy();
                };

                // Recursively remove parent roles
                await removeParentRoles(parentRole.parentId);
            }
        };

        await removeParentRoles(roleId)

        return res.status(200).json(
            responses.success({
                message: "Role and parent roles successfully removed from user."
            })
        );
    } catch (error) {
        console.error("Error while removing role from user:", error);
        return res.status(500).json(
            responses.error({
                name: "InternalServer",
                message: "Error while removing role from user."
            })
        );
    };
};

module.exports = removeRole;