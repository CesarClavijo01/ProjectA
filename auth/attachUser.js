const verifyJWT = require('./verifyJWT');
const models = require('../models');
const responses = require("../responses");

const attachUser = async (req, res, next) => {
    // Initialize Bearer prefix
    const prefix = 'Bearer ';
    // Grab authorization header
    const auth = req.header('Authorization');
    // If no auth header is present
    if (!auth) {
        // Pass
        return next();
    };
    // If it's a Bearer token
    if (auth.startsWith(prefix)) {
        // Slice off "Bearer "
        const token = auth.slice(prefix.length);

        // If blank
        if (!token) {
            // Pass
            return next();
        };

        try {

            // Verify token
            const verifiedToken = verifyJWT(token);

            // If it verified
            if (verifiedToken) {
                // Attach
                req.user = await models.User.scope('attach').findByPk(verifiedToken.id, {
                    include: [{
                        model: models.Role,
                        as: "roles",
                        attributes: ['id', 'name', 'description'],
                        through: { attributes: [] }
                    }]
                });
            };
            // Pass
            return next();

        } catch (error) {
            console.error("Error Attaching user to request:", error);
            return res.status(500).json(
                responses.error({
                    name: "AttachUser",
                    message: "Error attaching user to request."
                })
            );
        };

    };

    // Uh oh! no bears!
    return res.status(401).json(
        responses.error({
            name: "AttachUser",
            message: 'Authorization token must start with "Bearer".'
        })
    );

};

module.exports = attachUser;