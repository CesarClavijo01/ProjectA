const responses = require("../../responses");
const { User } = require("../../models");

const deleteAccount = async (req, res) => {
    try {
        // Get the user's id from the request
        const userId = req.user.id;

        // Find the user in the database
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json(
                responses.error({
                    name: "UserNotFound",
                    message: "User does not exist or has already been deleted.",
                })
            );
        };

        // Delete the user
        await user.destroy();

        return res.status(200).json(
            responses.success({
                message: "Account deleted successfully. Bye!",
            })
        );
    } catch (error) {
        console.error("Error deleting user:", error);
        return res.status(500).json(
            responses.error({
                name: "DeleteAccount",
                message: "Internal server error.",
            })
        );
    };
};

module.exports = deleteAccount;