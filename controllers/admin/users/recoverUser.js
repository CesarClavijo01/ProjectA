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

        if (!user) {
            return res.status(404).json(
                responses.error({
                    name: "UserNotFound",
                    message: `User with id ${userId} not found.`,
                })
            );
        }

        if (user.deletedAt === undefined) {
            return res.status(400).json(
                responses.error({
                    name: "UserNotDeleted",
                    message: `User is not soft-deleted.`,
                    data: { userId }
                })
            );
        }

        await User.restore({ where: { id: userId } });

        await AdminAction.create({
            adminId,
            userId,
            action: `Recovered user id#${userId}`
        });

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