const responses = require("../../../responses");
const { User } = require("../../../models");

const removeUser = async (req, res) => {
    const { userId } = req.params;

    try {
        // Find user to delete
        const user = await User.scope("id").findByPk(userId);
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

        // Return
        return res.status(200).json(
            responses.success({
                message: "User successfully deleted."
            })
        );

    } catch (error) {
        console.error("Error while removing user:", error);
        return res.status(500).json(
            responses.error({
                name: "InternalServer",
                message: "Error while removing user."
            })
        );
    };
};

module.exports = removeUser;