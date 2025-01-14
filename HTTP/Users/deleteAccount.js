const { deleteAccountService } = require("../../services/users")
const responses = require("../../responses");

const deleteAccount = async (req, res) => {
    // Get the user's id from the request
    const userId = req.user.id;

    try {
        // Soft-delete the user
        const result = await deleteAccountService({ userId })

        const statusCode = 200;
        return res.status(statusCode).json(
            responses.success({
                statusCode,
                message: "Account deleted successfully."
            })
        );
    } catch (error) {
        console.error("Error while deleting user:", error);
        return res.status(500).json(
            responses.error({
                name: "InternalServer",
                message: "Error while deleting account.",
            })
        );
    };
};

module.exports = deleteAccount;