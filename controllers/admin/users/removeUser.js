const responses = require("../../../responses");
const { User, AdminAction } = require("../../../models");

const removeUser = async (req, res) => {
    const { userId } = req.params;
    const adminId = req.user.id;

    try {
        // Find user to delete
        const user = await User.scope("delete").findByPk(userId);
        if (!user) {
            return res.status(404).json(
                responses.error({
                    name: "UserNotFound",
                    message: "User not found."
                })
            );
        };

        // Delete the user
        await user.destroy();

        // Log admin action
        await AdminAction.create({
            adminId,
            userId,
            action: `Soft-deleted user`,
        });

        // Return
        return res.status(200).json(
            responses.success({
                message: "User marked for deletion. Will be permanent in 30 days."
            })
        );

    } catch (error) {
        console.error("Error while removing user");
        console.error(error);
        return res.status(500).json(
            responses.error({
                name: "InternalServer",
                message: "Error while removing user."
            })
        );
    };
};

module.exports = removeUser;