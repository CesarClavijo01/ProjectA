const { Router } = require("express");
const adminRoutes = Router();
const { admin: adminController } = require("../controllers");

adminRoutes.post("/add-role/:userId", adminController.addRole);

module.exports = adminRoutes;