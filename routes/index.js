const { Router } = require("express");
const apiRoutes = Router();

const usersRoutes = require("./users");
apiRoutes.use("/users", usersRoutes)

module.exports = apiRoutes;