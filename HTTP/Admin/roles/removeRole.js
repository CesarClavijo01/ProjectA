const responses = require("../../../responses");
const { roles } = require("../../../services/admin");

const removeRoleService = async (req, res) => {
    const { userId, roleId } = req.body;
    const adminId = req.user.id;

    try {
        await roles.removeRoleService({ userId, adminId, roleId });

        const statusCode = 200;
        return res.status(statusCode).json(
            responses.success({
                statusCode,
                message: "Role and parent roles removed from user successfully."
            })
        );

    } catch (error) {
        // console.error(error);
        return res.status(error.statusCode).json(error);
    };
};

module.exports = removeRoleService;