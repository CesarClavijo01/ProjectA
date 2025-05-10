const getUserByIdService = require("./getById");

const deleteAccountService = async (data) => {

    const {
        userId
    } = data;

    try {
        const user = await getUserByIdService({ userId });

        await user.destroy();

        return;

    } catch (error) {
        // If it is a client error, throw it
        if (error.statusCode) throw error;

        // If not, log it
        console.error(error)

        // Throw server error
        const serverError = {
            name: "InternalServer",
            message: "Error while fetching users.",
            statusCode: 500
        };
        throw serverError;
    };
};

module.exports = deleteAccountService;