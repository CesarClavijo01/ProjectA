const responses = require('../responses');

const requireRole = (requiredRole) => {
    return async (req, res, next) => {
        try {
            // Check if the user has the role id
            const canDo = req.user.roles.some(role => role.name === requiredRole);

            if (!canDo) {
                return res.status(403).json(
                    responses.error({
                        name: "Forbidden",
                        message: "Invalid permissions."
                    })
                );
            }

            // User has permissions, proceed to the next middleware or route handler
            next();

        } catch (error) {
            console.error("Error in requireRole middleware:", error);
            return res.status(500).json(
                responses.error({
                    name: "InternalServerError",
                    message: "Error while checking permissions."
                })
            );
        }
    };
};
module.exports = requireRole;