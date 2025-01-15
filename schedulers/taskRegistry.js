const scheduler = require("./scheduler");
const deleteExpiredUsers = require("./tasks/deleteExpiredUsers");

scheduler.registerTask(
    "deleteExpiredUsers",
    "0 0 0 * * *", // At midnight
    deleteExpiredUsers // Delete expired users
);

console.log("All tasks registered.");