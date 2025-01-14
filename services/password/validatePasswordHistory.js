const { PasswordHistory } = require("../../models");
const compare = require("./compare")

async function validatePasswordHistory({ userId, password }) {
    
    try {
        const prevPasswords = await PasswordHistory.findAll({ where: { userId } });

        if (prevPasswords.length) {
            for (const prevPassword of prevPasswords) {
                const isSame = await compare(password, prevPassword.hash);
                if (isSame) {
                    const clientError = {
                        statusCode: 400,
                        name: "PreviousPassword",
                        message: "Password must be different from previous passwords."
                    };
                    throw clientError;
                };
            };
        };

        return;

    } catch (error) {
        // If it is a client error, throw it
        if (error.statusCode) throw error;

        // If not, log it
        console.error(error);

        // Throw server error
        const serverError = {
            name: "InternalServer",
            message: "Error while validating password history.",
            statusCode: 500
        };
        throw serverError;
    };
};

module.exports = validatePasswordHistory;