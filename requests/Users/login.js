const { loginUserService } = require("../../services/users")
const responses = require("../../responses");

const loginUser = async (req, res) => {
    try {
        // Login the user
        const result = await loginUserService(req.body);

        // Return login data
        const statusCode = 200;
        return res.status(statusCode).json(
            responses.success({
                message: "Logged in.",
                statusCode,
                data: result
            })
        );

        // Errors
    } catch (error) {
        console.log(error);
        return res.status(error.statusCode).json(
            responses.error(error)
        );
    };
};

module.exports = loginUser;