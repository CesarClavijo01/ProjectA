const responses = require("../../../responses");
const { users } = require("../../../services/admin");

const recoverUser = async (req, res) => {
    const { userId } = req.params;
    const adminId = req.user.id

    try {
        const user = await users.adminRecoverUserService({ userId, adminId });

        // Return
        statusCode = 200;
        return res.status(statusCode).json(
            responses.success({
                statusCode,
                message: "User recovered successfully.",
                data: user
            })
        );

    } catch (error) {
        // console.error(error);
        return res.status(error.statusCode).json(error);
    };
};

module.exports = recoverUser;