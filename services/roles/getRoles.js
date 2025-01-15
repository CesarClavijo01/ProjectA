const { Roles } = require("../../models")

async function getRolesService() {

    try {
        const roles = Roles.findAll();
        if (!roles.length) {
            const clientError = {
                name: "RolesNotFound",
                message: "Roles not found.",
                statusCode: 404
            };
            throw clientError;
        };
        return roles;
    } catch (error) {
        // Log the error
        console.error(error);

        // Throw a server error
        const serverError = {
            name: "InternalServer",
            message: "Error while fetching roles.",
            statusCode: 500
        };
        throw serverError;
    };

};

module.exports = getRolesService; 