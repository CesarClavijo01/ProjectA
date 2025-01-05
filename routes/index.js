const { Router } = require("express");
const apiRoutes = Router();
const { requireUser, requireRole } = require("../middleware"); 

const usersRoutes = require("./users");
apiRoutes.use("/users", usersRoutes);

const adminRoutes = require("./admin");
apiRoutes.use("/admin", requireUser, requireRole("Admin"), adminRoutes);

const accountRoutes = require("./account");
apiRoutes.use("/account", requireUser, accountRoutes)

module.exports = apiRoutes;