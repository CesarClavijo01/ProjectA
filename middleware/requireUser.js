const responses = require('../responses');

const requireUser = async (req, res, next) => {
    if (!req.user) {
        return res.status(401).json(
            responses.error({
                name: "RequireUser",
                message: "User must be logged in to perform this action."
            })
        );
    };
    next();
};

module.exports = requireUser;