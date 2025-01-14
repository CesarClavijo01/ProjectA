const validatePassword = require("./validatePassword");
const { User, PasswordHistory } = require("../../models");
const getUserByIdService = require("../users/getById");
const hashPassword = require("./hash");
const validatePasswordHistory = require("./validatePasswordHistory");

async function updatePassword(data) {
    const {
        userId,
        reqPassword,
        conPassword
    } = data;

    try {

        validatePassword(reqPassword, conPassword);
        await validatePasswordHistory({ userId, password: reqPassword });
        const hash = await hashPassword(reqPassword);
        await PasswordHistory.create({ userId, hash })
        const user = await User.scope('password').findByPk(userId);
        if (!user) {
            return res.status(404).json(
                responses.error({
                    name: "UserNotFound",
                    message: "User not found."
                })
            );
        };
        await user.update({ hash });

        return;

    } catch (error) {
        // If it is a client error, throw it
        if (error.statusCode) throw error;

        // If not, log it
        console.error(error);

        // Throw server error
        const serverError = {
            name: "InternalServer",
            message: "Error while updating password.",
            statusCode: 500
        };
        throw serverError;
    };
};

module.exports = updatePassword;