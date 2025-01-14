const responses = require("../../../responses");
const { roles } = require("../../../services/admin")

const assignRole = async (req, res) => {
    const { userId, roleId } = req.body;
    const adminId = req.user.id;

    try {
        await roles.assignRoleService({ userId, adminId, roleId });

        const statusCode = 201;
        return res.status(statusCode).json(
            responses.success({
                statusCode,
                message: "Role and child roles added to user successfully."
            })
        );

    } catch (error) {
        // console.error(error)
        return res.status(error.statusCode).json(error)
    };
};

module.exports = assignRole;