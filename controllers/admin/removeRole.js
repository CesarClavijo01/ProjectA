const responses = require("../../responses");
const { User, Role, UserRole } = require("../../models");
const { Op } = require("sequelize");

const removeRole = async (req, res) => {
    const { userId } = req.params;
    const { roleId } = req.body;

    // Prevent removal of basic user role
    if (roleId === "1") {
        return res.status(400).json(
            responses.error({
                name: "RemoveBasicRole",
                message: "Cannot remove basic user role."
            })
        );
    };

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
                roleId: { [Op.gte]: roleId }
            }
        });

        return res.status(200).json(
            responses.success({
                message: "Role and sub roles successfully removed from user."
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