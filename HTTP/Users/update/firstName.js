const responses = require('../../../responses');
const { updateFirstNameService } = require('../../../services/users/update');

const updateFirstName = async (req, res) => {
    const { firstName } = req.body;
    const data = {
        userId: req.user.id,
        firstName
    };

    try {

        const user = await updateFirstNameService(data);
        const statusCode = 201;
        return res.status(statusCode).json(
            responses.success({
                statusCode,
                message: "Successfully updated first name.",
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

module.exports = updateFirstName;