const responses = require('../../../responses');
const { updateUsernameService } = require('../../../services/users/update');

const updateUsername = async (req, res) => {
    const { username } = req.body;
    const data = {
        userId: req.user.id,
        username
    };
    
    try {

        const user = await updateUsernameService(data);
        const statusCode = 200;
        return res.status(statusCode).json(
            responses.success({
                statusCode,
                message: "Successfully updated username.",
                data: user
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