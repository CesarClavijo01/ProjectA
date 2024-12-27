const { User } = require('../../../models');
const responses = require('../../../responses');
const config = require("../config.json");
const { validateField } = require("../../../util");

const updateUsername = async (req, res) => {
    const { username } = req.body;

    // Make sure a username is provided
    if (!username || typeof (username) !== "string") {
        return res.status(400).json(
            responses.error({
                name: "UpdateUsername",
                message: "Supply a username."
            })
        );
    };

    // Validate requested username
    const response = validateField("Username", username, config.username);
    if (response) return res.status(400).json(response);

    // Check if it's a new username
    if (username === req.user.username) {
        return res.status(400).json(
            responses.error({
                name: "InvalidUsername",
                message: "New username must be different from old username."
            })
        );
    };

    try {
        // Check for an existing duplicate username
        const existing = await User.scope("id").findOne({ where: { username } })
        if (existing) {
            return res.status(400).json(
                responses.error({
                    name: "InvalidUsername",
                    message: "Username already in use."
                })
            );
        };

        // Grab the user to update
        const userId = req.user.id;
        const user = await User.scope("id").findByPk(userId);
        if (!user) {
            return res.status(404).json(
                responses.error({
                    name: "UpdateUsername",
                    message: "User not found."
                })
            );
        };

        // Update
        user.username = username;
        await user.save();

        // Return
        return res.status(200).json(
            responses.success({
                message: "Username updated successfully.",
                data: { username }
            })
        );

    } catch (error) {
        // Server error
        return res.status(500).json(
            responses.error({
                name: "UpdateUsername",
                message: "Internal server error."
            })
        );
    }
};

module.exports = updateUsername;