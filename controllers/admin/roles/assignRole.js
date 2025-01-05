const { Op } = require("sequelize");
const responses = require("../../../responses");
const { User, Role, UserRole, RoleHierarchy } = require("../../../models");

const assignRole = async (req, res) => {
    const { userId, roleId } = req.body;

    try {
        // Check if the user exists
        const user = await User.scope('id').findByPk(userId);
        if (!user) {
            return res.status(404).json(
                responses.error({
                    name: "UserNotFound",
                    message: "User not found."
                })
            );
        }

        // Check if the role exists
        const role = await Role.scope('id').findByPk(roleId);
        if (!role) {
            return res.status(404).json(
                responses.error({
                    name: "RoleNotFound",
                    message: "Role not found."
                })
            );
        }

        // Check if the user already has the role
        const existingUserRole = await UserRole.findOne({
            where: {
                userId,
                roleId
            }
        });
        if (existingUserRole) {
            return res.status(400).json(
                responses.error({
                    name: "RoleAssigned",
                    message: "User already has this role."
                })
            );
        };

        await UserRole.create({ userId, roleId });

        const assignChildrenRoles = async (parentId) => {
            // Grab all the child roles
            const childRoles = await RoleHierarchy.findAll({
                where: { parentId }
            });

            // Iterate over the child roles
            for (const childRole of childRoles) {
                // Create a role for that user
                const existingChildRole = await UserRole.scope('id').findOne({
                    where: { userId, roleId: childRole.childId }
                });

                // If the user doesn't already have the child role, assign it
                if (!existingChildRole) {
                    await UserRole.create({ userId, roleId: childRole.childId });
                };

                // Recurse and assign all children
                await assignChildrenRoles(childRole.childId);
            };
        };

        // Assign the children roles
        await assignChildrenRoles(roleId);

        // Return
        return res.status(200).json(
            responses.success({
                message: "Role added to user successfully.",
            })
        );

    } catch (error) {
        console.error("Error adding role to user:", error);
        return res.status(500).json(
            responses.error({
                name: "InternalServerError",
                message: "Error while adding role to user."
            })
        );
    };
};

module.exports = assignRole;