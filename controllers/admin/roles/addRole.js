const { Op } = require("sequelize");
const responses = require("../../../responses");
const { User, Role, UserRole } = require("../../../models");

const addRole = async (req, res) => {
    const { userId } = req.params;
    const { roleId } = req.body;

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
        const existingUserRole = await UserRole.scope('id').findOne({
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

        // Find role and all sub roles
        const roles = await Role.scope("name").findAll({
            where: { id: { [Op.lte]: roleId } }
        });

        // Grab any pre-existing roles or sub roles
        const existingUserRoles = await UserRole.scope("roleId").findAll({
            where: { userId, roleId: { [Op.lte]: roleId } }
        });

        // Create an array of existing role ids
        const existingRoleIds = existingUserRoles.map(ur => ur.roleId);

        // Filter roles to add: those not already assigned
        const rolesToAdd = roles.filter(role => !existingRoleIds.includes(role.id));

        // Verify there is at least 1 to apply
        if (rolesToAdd.length === 0) {
            return res.status(400).json(
                responses.error({
                    name: "RolesAssigned",
                    message: "These permissions are already assigned to this user"
                })
            );
        };

        // Create them
        await UserRole.bulkCreate(rolesToAdd.map(role => ({ userId, roleId: role.id })));
        
        // Return
        return res.status(200).json(
            responses.success({
                message: "Role added to user successfully.",
                data: rolesToAdd
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

module.exports = addRole;