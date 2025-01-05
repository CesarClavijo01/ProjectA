const { User } = require("../../models");
const { Op } = require("sequelize");

const deleteExpiredUsers = async () => {
    const thresholdDate = new Date();
    thresholdDate.setDate(thresholdDate.getSeconds() - 30);
    
    try {
        const usersToDelete = await User.findAll({
            where: {
                deletedAt: {
                    [Op.lte]: thresholdDate
                }
            }
        });

        if (usersToDelete.length < 1) {
            return console.log("No users to delete")
        }

        for (const user of usersToDelete) {
            await user.destroy({ force: true });
        };

        return console.log("Expired users deleted.");

    } catch (error) {
        console.error(`Error deleting expired users: Time: ${new Date().toLocaleString()}`)
    };
};

module.exports = deleteExpiredUsers