const responses = require('../../responses');

const account = async (req, res) => {
    res.status(200).json(
        responses.success({
            message: "Account fetched.",
            data: req.user
        })
    );
};

module.exports = account;