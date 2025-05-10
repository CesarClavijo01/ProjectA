const responses = require('../responses');

const requireRole = (requiredRole) => {
    return async (req, res, next) => {

        // Check if the user has the role id
        const canDo = req.user.roles.some(role => role.name === requiredRole);

        if (!canDo) {
            return res.status(403).json(
                responses.error({
                    name: "Permissions",
                    message: "Invalid permissions."
                })
            );
        };

        // User has permissions, proceed to the next middleware or route handler
        next();
    };
};

module.exports = requireRole;