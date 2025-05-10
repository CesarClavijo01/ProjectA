const { User } = require("../../models");
const { Op } = require("sequelize");

const deleteExpiredUsers = async () => {
    // Get 30 days ago
    const thresholdDate = new Date();
    thresholdDate.setDate(thresholdDate.getDate() - 30);
    
    try {
        // Delete users that were soft-deleted 30+ days ago
        const deletedCount = await User.destroy({
            where: {
                deletedAt: {
                    [Op.lte]: thresholdDate
                }
            },
            force: true
        });

        // If there weren't users
        if (deletedCount === 0) {
            // Cool
            return console.log("No users to delete")
        };

        // If there were, awesome
        return console.log("Expired users deleted.");

    } catch (error) {
        console.error(`Error deleting expired users: Time: ${new Date().toLocaleString()}`)
    };
};

module.exports = deleteExpiredUsers