const { User } = require('../../models');
const passwordHandler = require('../password');
const { checkMissingFields } = require('../../util');
const { validateField } = require("../../regex");
const config = require('./config.json');
const { generateJWT } = require('../../auth');
const existingUsernameService = require('./existingUsername');
const existingEmailService = require('./existingEmail');

async function registerUserService(data) {
    const {
        firstName,
        lastName,
        username,
        reqEmail,
        conEmail,
        reqPassword,
        conPassword
    } = data;

    try {

        // Check for missing fields
        const requiredFields = { username, reqEmail, conEmail, reqPassword, conPassword };
        checkMissingFields(requiredFields);

        // Validate fields
        if (firstName) {
            validateField("FirstName", firstName, null, config.firstName);
        };
        if (lastName) {
            validateField("LastName", lastName, null, config.lastName);
        };
        validateField("Username", username, null, config.username);
        validateField("Email", reqEmail, conEmail, config.email);

        // Validate password
        passwordHandler.validatePassword(reqPassword, conPassword);

        // Check for existing email or username
        await existingEmailService({ email: reqEmail });
        await existingUsernameService({ username });

        // Hash password and create user
        const passwordHash = await passwordHandler.hash(reqPassword);
        const newUser = await User.create({
            firstName,
            lastName,
            username,
            email: reqEmail,
            hash: passwordHash
        });

        // Delete hash and generate token
        const user = { ...newUser.toJSON() };
        delete user.hash;

        const token = generateJWT(user.id);

        return { user, token };
    } catch (error) {
        // If it is a client error, throw it
        if (error.statusCode) throw error;

        // If not, log it
        console.error(error)

        // Throw server error
        const serverError = {
            name: "InternalServer",
            message: "Error while fetching users.",
            statusCode: 500
        };
        throw serverError;
    };
};

module.exports = registerUserService;