const config = require("../config.json")
const { User } = require('../../../models');
const responses = require('../../../responses');
const { validateField } = require('../../../regex');

const updateLastName = async (req, res) => {
    const { lastName } = req.body;
    // Make sure a last name is provided
    if (!lastName || typeof(lastName) !== "string") {
        return res.status(400).json(
            responses.error({
                name: "InvalidLastName",
                message: "Supply a last name."
            })
        );
    };

    // Validate requested last name
    const response = validateField("LastName", lastName, config.lastName);
    if (response) return res.status(400).json(response);

    // Check if it's a new last name
    if (lastName === req.user.lastName) {
        return res.status(400).json(
            responses.error({
                name: "InvalidLastName",
                message: "New last name must be different from old last name."
            })
        );
    };

    try {
        // Grab the user to update
        const userId = req.user.id;
        const user = await User.scope("id").findByPk(userId);
        if (!user) {
            return res.status(404).json(
                responses.error({
                    name: "UserNotFound",
                    message: "User not found."
                })
            );
        };

        // Update
        user.lastName = lastName;
        await user.save();

        // Return
        return res.status(200).json(
            responses.success({
                message: "Last name updated successfully.",
                data: { lastName }
            })
        )

    } catch (error) {
        // Server error
        console.error(`Error while updating user last name: ${error}`);
        return res.status(500).json(
            responses.error({
                name: "InternalServer",
                message: "Error while updating last name."
            })
        )
    }
};

module.exports = updateLastName;