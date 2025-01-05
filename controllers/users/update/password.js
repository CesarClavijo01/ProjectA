const { User, PasswordHistory } = require('../../../models');
const responses = require('../../../responses');
const passwordHandler = require('../../../password');

const updatePassword = async (req, res) => {
    const { reqPassword, conPassword } = req.body;
    const userId = req.user.id;

    // Test password
    const response = passwordHandler.passwordTest(reqPassword, conPassword);
    if (response) {
        return res.status(400).json(
            responses.error({
                name: "InvalidPassword",
                message: response.message
            })
        );
    };

    try {
        // Check for existing passwords
        const previousPasswords = await PasswordHistory.findAll({
            where: { userId }
        })

        if (previousPasswords.length) {
            for (const previousPassword of previousPasswords) {
                const isSame = await passwordHandler.compare(reqPassword, previousPassword.hash)
                if (isSame) {
                    return res.status(400).json(
                        responses.error({
                            name: "PreviousPassword",
                            message: "Password must be different from previous passwords."
                        })
                    )
                }
            }
        }

        // Hash password
        const passwordHash = await passwordHandler.hash(reqPassword);

        // Grab user to update
        const user = await User.scope('password').findByPk(userId);
        if (!user) {
            return res.status(404).json(
                responses.error({
                    name: "UserNotFound",
                    message: "User not found."
                })
            );
        };

        // Verify that password is new
        const isSame = await passwordHandler.compare(reqPassword, user.hash);
        if (isSame) {
            return res.status(400).json(
                responses.error({
                    name: "InvalidPassword",
                    message: "Password cannot be the same as the old password."
                })
            );
        };

        // Update
        await user.update({ hash: passwordHash })

        // Store the new password in password history
        await PasswordHistory.create({
            userId,
            hash: passwordHash
        });

        // Return
        return res.status(200).json(
            responses.success({
                message: "Password updated successfully."
            })
        );

    } catch (error) {
        console.error(`Error while updating user password: ${error}`);
        return res.status(500).json(
            responses.error({
                name: "InternalServer",
                message: "Error while updating password."
            })
        );
    };
};

module.exports = updatePassword;