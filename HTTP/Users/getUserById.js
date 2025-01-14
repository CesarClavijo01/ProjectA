const { getUserByIdService } = require("../../services/users");
const responses = require('../../responses');

const getUserById = async (req, res) => {
    try {
        // Find user
        const user = await getUserByIdService(req.params);

        // Return
        const statusCode = 200;
        return res.status(statusCode).json(
            responses.success({
                message: "User fetched successfully.",
                statusCode,
                data: { user }
            })
        );

    } catch (error) {

        return res.status(error.statusCode).json(
            responses.error(error)
        );
 
    };
};

module.exports = getUserById;