const { getUsersByUsernameService } = require("../../services/users")
const responses = require('../../responses');

const searchUsersByUsername = async (req, res) => {
    const { username, limit = 10, page = 0 } = req.query;

    try {
        const users = await getUsersByUsernameService({ username, limit, page });

        const statusCode = 200;
        return res.status(statusCode).json(
            responses.success({
                message: "Users fetched successfully.",
                statusCode,
                data: { users }
            })
        );
    } catch (error) {
        console.log(error)
        return res.status(error.statusCode).json(
            responses.error(error)
        );
    };
};

module.exports = searchUsersByUsername;