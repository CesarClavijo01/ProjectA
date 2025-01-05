const responses = require("../../../responses");
const { User, AdminAction } = require("../../../models");

const recoverUser = async (req, res) => {
    const { userId } = req.params;
    const adminId = req.user.id;

    try {
        // Find the user, including soft-deleted ones
        const user = await User.scope('delete').findOne({
            where: { id: userId },
            paranoid: false, // Include soft-deleted rows
        });

        // If no user
        if (!user) {
            // Error out
            return res.status(404).json(
                responses.error({
                    name: "UserNotFound",
                    message: `User with id ${userId} not found.`,
                })
            );
        };

        // If already active
        if (user.deletedAt === undefined) {
            // Error out
            return res.status(400).json(
                responses.error({
                    name: "UserNotDeleted",
                    message: `User is not soft-deleted and already active.`,
                    data: { userId }
                })
            );
        }

        // Recover the user
        await User.restore({ where: { id: userId } });

        // Log admin action
        await AdminAction.create({
            adminId,
            userId,
            action: `Recovered user id#${userId}`
        });

        // Return
        return res.status(200).json(
            responses.success({
                message: "User recovered successfully."
            })
        );

    } catch (error) {
        console.error("Error recovering user");
        console.error(error);
        return res.status(500).json(
            responses.error({
                name: "InternalServer",
                message: "Error while recovering user."
            })
        );
    };
};

module.exports = recoverUser;