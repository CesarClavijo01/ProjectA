const { User } = require('../../models');
const responses = require('../../responses');

const getUserById = async (req, res) => {
    try {
        // Grab id from params
        const { userId } = req.params;
        if (!userId) {
            return res.status(400).json(
                responses.error({
                    name: "GetUserById",
                    message: "No user id present in parameters."
                })
            )
        };

        // Find user
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json(
                responses.error({
                    name: "UserNotFound",
                    message: "User not found."
                })
            )
        };

        // Return
        return res.status(200).json(
            responses.success({
                message: "User fetched successfully.",
                data: {
                    user
                }
            })
        );

    } catch (error) {
        console.error(`Error while fetching user: ${error}`);
        return res.status(500).json(
            responses.error({
                name: "InternalServer",
                message: "Error while attempting to fetch user."
            })
        )
    }
};

module.exports = getUserById;