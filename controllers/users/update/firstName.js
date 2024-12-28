const config = require("../config.json")
const { User } = require('../../../models');
const responses = require('../../../responses');
const { validateField } = require('../../../regex');

const updateFirstName = async (req, res) => {
    const { firstName } = req.body;
    // Make sure a first name is provided
    if (!firstName || typeof(firstName) !== "string") {
        return res.status(400).json(
            responses.error({
                name: "InvalidFirstName",
                message: "Supply a first name."
            })
        );
    };

    // Validate requested first name
    const response = validateField("FirstName", firstName, config.firstName);
    if (response) return res.status(400).json(response);

    // Check if it's a new first name
    if (firstName === req.user.firstName) {
        return res.status(400).json(
            responses.error({
                name: "InvalidFirstName",
                message: "New first name must be different from old first name."
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
        user.firstName = firstName;
        await user.save();

        // Return
        return res.status(200).json(
            responses.success({
                message: "First name updated successfully.",
                data: { firstName }
            })
        )

    } catch (error) {
        // Server error
        console.error(`Error while updating user first name: ${error}`);
        return res.status(500).json(
            responses.error({
                name: "InternalServer",
                message: "Error while updating first name."
            })
        )
    }
};

module.exports = updateFirstName;