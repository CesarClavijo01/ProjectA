const responses = require("../../../responses");
const { users } = require("../../../services/admin");

const removeUser = async (req, res) => {
    const { userId } = req.params;
    const adminId = req.user.id;

    try {
        await users.adminDeleteUserService({ userId, adminId });

        const statusCode = 200;
        return res.status(statusCode).json(
            responses.success({
                statusCode,
                message: "User deleted successfully."
            })
        );

    } catch (error) {
        console.error(error);
        return res.status(error.statusCode).json(error);
    };
};

module.exports = removeUser;