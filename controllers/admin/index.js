// Users with role 3 have role (3 - 1) to 1.
// This is so that they can do everything that a sub role can do.
module.exports = {
    addRole: require("./addRole"),
    removeRole: require("./removeRole"),
};