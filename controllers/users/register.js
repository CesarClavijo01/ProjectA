const { User } = require('../../models');
const responses = require('../../responses');
const { passwordTest, hash } = require('../../password');
const { generateJWT } = require('../../auth');
const { emailTest, usernameTest } = require('../../regex');
const { getMissingFields, confirmEntry } = require('../../util')

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
    
    // Validate fields
    const requiredFields = {
        username,
        reqEmail,
        conEmail,
        reqPassword,
        conPassword
    };
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

    // Validate Email
    const emailResponse = emailTest(reqEmail, conEmail);
    if (emailResponse.error) {
        return res.status(400).json(
            responses.error({
                name: "RegisterUser",
                message: emailResponse.message
            })
        );
    };
    // Validate Username
    const usernameResponse = usernameTest(username);
    if (usernameResponse.error) {
        return res.status(400).json(
            responses.error({
                name: "RegisterUser",
                message: usernameResponse.message
            })
        );
    };
    // Validate Password
    const passwordResponse = passwordTest(reqPassword, conPassword);
    console.log(passwordResponse)
    if (passwordResponse.error) {
        return res.status(400).json(
            responses.error({
                name: "RegisterUser",
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
                    name: "RegisterUser",
                    message: "Email already in use."
                })
            );
        };
        // Existing username
        const existingUsername = await User.scope('register').findOne({ where: { username } })
        if (existingUsername) {
            return res.status(400).json(
                responses.error({
                    name: "RegisterUser",
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
        return res.status(200).json(
            responses.success({
                name: "RegisterUser",
                message: "User registered successfully.",
                data: {
                    user,
                    token
                }
            })
        );
    } catch (error) {
        console.log(error)
        return res.status(500).json(
            responses.error({
                name: "RegisterUser",
                message: "Internal server error."
            })
        );
    };
};

module.exports = registerUser;