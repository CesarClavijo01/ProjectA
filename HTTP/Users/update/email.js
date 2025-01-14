const responses = require('../../../responses');
const { updateEmailService } = require('../../../services/users/update');

const updateUsername = async (req, res) => {
    const { reqEmail, conEmail } = req.body;
    const data = {
        userId: req.user.id,
        reqEmail,
        conEmail
    };

    try {

        const user = await updateEmailService(data);
        const statusCode = 201;
        return res.status(statusCode).json(
            responses.success({
                statusCode,
                message: "Successfully updated username.",
                data: { user }
            })
        );

    } catch (error) {

        // console.log(error);
        return res.status(error.statusCode).json(
            responses.error(error)
        );
        
    };
};

module.exports = updateUsername;