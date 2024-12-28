const { User } = require('../../models');
const responses = require('../../responses');
const passwordHandler = require('../../password');
const { generateJWT } = require('../../auth');
const { getMissingFields } = require('../../util');
const { validateField } = require("../../regex")
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
    const firstNameResponse = validateField("FirstName", firstName, config.firstName);
    if (firstNameResponse) return res.status(400).json(firstNameResponse);

    // Validate last name
    const lastNameResponse = validateField("LastName", lastName, config.lastName);
    if (lastNameResponse) return res.status(400).json(lastNameResponse);

    // Validate Username
    const usernameResponse = validateField("Username", username, config.username);
    if (usernameResponse) return res.status(400).json(usernameResponse);

    // Compare emails
    const isSame = reqEmail === conEmail;
    if (!isSame) {
        return res.status(400).json(
            responses.error({
                name: "InvalidEmail",
                message: "Emails do not match."
            })
        );
    };

    // Validate Email
    const emailResponse = validateField("Email", reqEmail, config.email);
    if (emailResponse) return res.status(400).json(emailResponse);

    // Validate Password
    const passwordResponse = passwordHandler.passwordTest(reqPassword, conPassword);
    if (passwordResponse) {
        return res.status(400).json(
            responses.error({
                name: "InvalidPassword",
                message: passwordResponse.message
            })
        );
    };
    try {
        // Existing email
        const existingEmail = await User.scope('id').findOne({ where: { email: reqEmail } })
        if (existingEmail) {
            return res.status(400).json(
                responses.error({
                    name: "InvalidEmail",
                    message: "Email already in use."
                })
            );
        };
        // Existing username
        const existingUsername = await User.scope('id').findOne({ where: { username } })
        if (existingUsername) {
            return res.status(400).json(
                responses.error({
                    name: "InvalidUsername",
                    message: "Username already in use."
                })
            );
        };
        // Hash password
        const passwordHash = await passwordHandler.hash(reqPassword);
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
        console.error(`Error while registering user: ${error}`);
        return res.status(500).json(
            responses.error({
                name: "InternalServer",
                message: "Error while registering user."
            })
        );
    };
};

module.exports = registerUser;