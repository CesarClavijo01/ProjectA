const { User } = require('../../../models');
const responses = require('../../../responses');
const config = require("../config.json");
const { validateField } = require("../../../util");

const updateEmail = async (req, res) => {
    const { reqEmail, conEmail } = req.body;

    // Make sure a requested email is provided
    if (!reqEmail || typeof (reqEmail) !== "string") {
        return res.status(400).json(
            responses.error({
                name: "UpdateEmail",
                message: "Supply an email."
            })
        );
    };

    // Make sure a confirmed email is provided
    if (!conEmail || typeof (conEmail) !== "string") {
        return res.status(400).json(
            responses.error({
                name: "UpdateEmail",
                message: "Confirm email."
            })
        );
    };

    // Validate requested email
    const response = validateField("Email", reqEmail, config.email);
    if (response) return res.status(400).json(response);
    
    // Compare requested email against confirmed email
    const isSame = (reqEmail === conEmail);
    if (!isSame) {
        return res.status(400).json(
            responses.error({
                name: "InvalidEmail",
                message: "Emails do not match."
            })
        );
    };

    // Check if it's a new email
    if (reqEmail === req.user.email) {
        return res.status(400).json(
            responses.error({
                name: "InvalidEmail",
                message: "New email must be different from old email."
            })
        );
    };

    try {
        // Check for an existing duplicate email
        const existing = await User.scope("id").findOne({ where: { email: reqEmail } })
        if (existing) {
            return res.status(400).json(
                responses.error({
                    name: "InvalidEmail",
                    message: "Email already in use."
                })
            );
        };
        
        // Grab the user to update
        const userId = req.user.id;
        const user = await User.scope("id").findByPk(userId);
        if (!user) {
            return res.status(404).json(
                responses.error({
                    name: "UpdateEmail",
                    message: "User not found."
                })
            );
        };

        // Update
        user.email = reqEmail;
        await user.save();

        // Return
        return res.status(200).json(
            responses.success({
                message: "Email updated successfully.",
                data: { email: reqEmail }
            })
        );

    } catch (error) {
        // Server Error
        return res.status(500).json(
            responses.error({
                name: "UpdateEmail",
                message: "Internal server error."
            })
        );
    };
};

module.exports = updateEmail;