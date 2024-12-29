const responses = require('../responses');

const requireRole = (roleId) => {
    return async (req, res, next) => {
        try {
            // Check if the user has the role id
            const canDo = req.user.roles.some(role => role.id === roleId);

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