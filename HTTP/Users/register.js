const { registerUserService } = require("../../services/users")
const responses = require('../../responses');

const registerUser = async (req, res) => {
    try {
        const result = await registerUserService(req.body);

        const statusCode = 201;
        return res.status(statusCode).json(
            responses.success({
                message: "User registered successfully.",
                statusCode,
                data: result
            })
        );

    } catch (error) {
        return res.status(error.statusCode).json(
            responses.error(error)
        );
    };
};

module.exports = registerUser;