module.exports = {
    loginUserService: require("./login"),
    registerUserService: require("./register"),
    getUserByIdService: require("./getById"),
    getUsersByUsernameService: require("./getByUsername"),
    deleteAccountService: require("./delete"),
    existingUsernameService: require("./existingUsername"),
    existingEmailService: require("./existingEmail"),
};