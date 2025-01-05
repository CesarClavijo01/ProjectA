const { Router } = require("express");
const adminRoutes = Router();
const { admin: adminController } = require("../controllers");

adminRoutes.post("/add-role/:userId", adminController.roles.addRole);

adminRoutes.patch("/recover-user/:userId", adminController.users.recoverUser);

adminRoutes.delete("/remove-role/:userId", adminController.roles.removeRole);
adminRoutes.delete("/remove-user/:userId", adminController.users.removeUser);

module.exports = adminRoutes;