const { Router } = require("express");
const adminRoutes = Router();
const { admin: adminController } = require("../controllers");

adminRoutes.post("/assign-role", adminController.roles.assignRole);

adminRoutes.patch("/recover-user/:userId", adminController.users.recoverUser);

adminRoutes.delete("/remove-role", adminController.roles.removeRole);
adminRoutes.delete("/remove-user/:userId", adminController.users.removeUser);

module.exports = adminRoutes;