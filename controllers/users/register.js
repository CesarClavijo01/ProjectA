const { User } = require('../../models');
const responses = require('../../responses');
const { passwordTest, hash } = require('../../password');
const { generateJWT } = require('../../auth');
const { test } = require('../../regex');
const { getMissingFields, validators } = require('../../util');
const config = require('./config.json');

const registerUser = async (req, res) => {
    const {
        firstName,      // can null
        lastName,       // can null
        username,
        reqEmail,
        conEmail,
        reqPassword,
        conPassword
    } = req.body;
    const requiredFields = {
        username,
        reqEmail,
        conEmail,
        reqPassword,
        conPassword
    };
    
    // Validate fields
    const missingFields = getMissingFields(requiredFields)
    if (missingFields.length > 0) {
        return res.status(400).json(
            responses.error({
                name: "RegisterUser",
                message: "Please supply all fields.",
                data: missingFields
            })
        );
    };

    // Validate first name
    const firstNameResponse = validators.validateField("FirstName", firstName, config.firstName);
    if (firstNameResponse) return res.status(400).json(firstNameResponse);

    // Validate last name
    const lastNameResponse = validators.validateField("LastName", lastName, config.lastName);
    if (lastNameResponse) return res.status(400).json(lastNameResponse);

    // Validate Email
    const emailResponse = validators.validateFieldWithConfirmation("Email", reqEmail, conEmail, config.email);
    if (emailResponse) return res.status(400).json(emailResponse);

    // Validate Username
    const usernameResponse = validators.validateField("Username", username, config.username);
    if (usernameResponse) return res.status(400).json(usernameResponse);

    // Validate Password
    const passwordResponse = passwordTest(reqPassword, conPassword);
    if (passwordResponse.error) {
        return res.status(400).json(
            responses.error({
                name: "InvalidPassword",
                message: passwordResponse.message
            })
        );
    };
    try {
        // Existing email
        const existingEmail = await User.scope('register').findOne({ where: { email: reqEmail } })
        if (existingEmail) {
            return res.status(400).json(
                responses.error({
                    name: "InvalidEmail",
                    message: "Email already in use."
                })
            );
        };
        // Existing username
        const existingUsername = await User.scope('register').findOne({ where: { username } })
        if (existingUsername) {
            return res.status(400).json(
                responses.error({
                    name: "InvalidUsername",
                    message: "Username already in use."
                })
            );
        };
        // Hash password
        const passwordHash = await hash(reqPassword);
        // Create new user
        const newUser = await User.create({
            firstName,
            lastName,
            username,
            email: reqEmail,
            hash: passwordHash
        });
        // Delete hash
        const user = { ...newUser.toJSON() };
        delete user.hash;
        // Create token
        const token = generateJWT(user.id);
        // Return
        return res.status(201).json(
            responses.success({
                message: "User registered successfully.",
                data: {
                    user,
                    token
                }
            })
        );
    } catch (error) {
        return res.status(500).json(
            responses.error({
                name: "RegisterUser",
                message: "Internal server error."
            })
        );
    };
};

module.exports = registerUser;