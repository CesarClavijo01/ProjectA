const responses = require('../../../responses');
const { updateLastNameService } = require('../../../services/users/update');

const updateLastName = async (req, res) => {
    const { lastName } = req.body;
    const data = {
        userId: req.user.id,
        lastName
    };

    try {

        const lastName = await updateLastNameService(data);
        const statusCode = 201;
        return res.status(statusCode).json(
            responses.success({
                statusCode,
                message: "Successfully updated last name.",
                data: { lastName }
            })
        );

    } catch (error) {

        // console.log(error);
        return res.status(error.statusCode).json(
            responses.error(error)
        );

    };
};

module.exports = updateLastName;