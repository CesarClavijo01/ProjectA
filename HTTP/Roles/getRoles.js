const getRolesService = require("../../services/roles/getRoles")

const getRoles = async (req, res) => {

    try {
        const roles = await getRolesService();

        const statusCode = 200;
        return res.statusCode(statusCode).json(
            responses.success({
                statusCode,
                message: "Roles fetched successfully.",
                data: { roles }
            })
        );

    } catch (error) {
        console.error(error);
        return res.statusCode(error.statusCode).json(error)
    };

};

module.exports = getRoles;
