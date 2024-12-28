const { Router } = require("express");
const apiRoutes = Router();
const { requireUser, requirePermissions } = require("../middleware"); 

const ADMIN_ROLE_ID = 3

const usersRoutes = require("./users");
apiRoutes.use("/users", usersRoutes);

const adminRoutes = require("./admin");
apiRoutes.use("/admin", requireUser, requirePermissions(ADMIN_ROLE_ID), adminRoutes);

const accountRoutes = require("./account");
apiRoutes.use("/account", requireUser, accountRoutes)

module.exports = apiRoutes;