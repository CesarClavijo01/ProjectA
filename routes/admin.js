const { Router } = require("express");
const adminRoutes = Router();
const { AdminRequests } = require("../requests");

adminRoutes.post("/assign-role", AdminRequests.roles.assignRole);

adminRoutes.patch("/recover-user/:userId", AdminRequests.users.recoverUser);

adminRoutes.delete("/remove-role", AdminRequests.roles.removeRole);
adminRoutes.delete("/delete-user/:userId", AdminRequests.users.deleteUser);

module.exports = adminRoutes;