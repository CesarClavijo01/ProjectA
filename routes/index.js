const { Router } = require("express");
const apiRoutes = Router();
const { requireUser, requireRole } = require("../middleware"); 

const ADMIN_ROLE_ID = 3;
const MOD_ROLE_ID = 2;
const USER_ROLE_ID = 1;

const usersRoutes = require("./users");
apiRoutes.use("/users", usersRoutes);

const adminRoutes = require("./admin");
apiRoutes.use("/admin", requireUser, requireRole(ADMIN_ROLE_ID), adminRoutes);

const accountRoutes = require("./account");
apiRoutes.use("/account", requireUser, accountRoutes)

module.exports = apiRoutes;