const responses = require('../../../responses');
const { updatePasswordService } = require('../../../services/password');

const updatePassword = async (req, res) => {
    const { reqPassword, conPassword } = req.body;
    const userId = req.user.id;

    try {

        await updatePasswordService({ userId, reqPassword, conPassword });
        const statusCode = 200
        return res.status(statusCode).json(
            responses.success({
                message: "Successfully updated password.",
                statusCode
            })
        );

    } catch (error) {
        // console.error(error);
        return res.status(error.statusCode).json(error);
    };
};

module.exports = updatePassword;