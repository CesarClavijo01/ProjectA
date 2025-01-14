const { Role } = require("../../models");

async function getRoleByIdService(data) {
    const {
        roleId
    } = data;

    try {

        const role = await Role.findByPk(roleId);
        if (!role) {
            const clientError = {
                name: "RoleNotFound",
                message: "Role not found.",
                statusCode: 404
            };
            throw clientError;
        };
        return role;

    } catch (error) {
        // If it is a client error, throw it
        if (error.statusCode) throw error;

        // If not, log it
        console.error(error);

        // Throw server error
        const serverError = {
            name: "InternalServer",
            message: "Error while fetching role.",
            statusCode: 500
        };
        throw serverError;
    };
};

module.exports = getRoleByIdService;