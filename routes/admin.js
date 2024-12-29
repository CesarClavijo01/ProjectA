const { Router } = require("express");
const adminRoutes = Router();
const { admin: adminController } = require("../controllers");

adminRoutes.post("/add-role/:userId", adminController.roles.addRole);
adminRoutes.delete("/remove-role/:userId", adminController.roles.removeRole);
adminRoutes.delete("/remove-user/:userId", adminController.users.removeUser)

module.exports = adminRoutes;