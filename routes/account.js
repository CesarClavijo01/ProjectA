const { Router } = require('express');
const accountRoutes = Router();
const { users: usersController } = require("../controllers")

accountRoutes.get("/", usersController.account);

accountRoutes.patch("/first-name", usersController.update.firstName);
accountRoutes.patch("/last-name", usersController.update.lastName);
accountRoutes.patch("/username", usersController.update.username);
accountRoutes.patch("/email", usersController.update.email);
accountRoutes.patch("/password", usersController.update.password);

module.exports = accountRoutes;