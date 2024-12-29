const { Router } = require("express");
const adminRoutes = Router();
const { admin: adminController } = require("../controllers");

adminRoutes.post("/add-role/:userId", adminController.addRole);
adminRoutes.post("/remove-role/:userId", adminController.removeRole);

module.exports = adminRoutes;