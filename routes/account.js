const { Router } = require('express');
const accountRoutes = Router();
const { UsersRequests } = require("../requests")

accountRoutes.get("/", UsersRequests.getAccount);

accountRoutes.patch("/first-name", UsersRequests.update.firstName);
accountRoutes.patch("/last-name", UsersRequests.update.lastName);
accountRoutes.patch("/username", UsersRequests.update.username);
accountRoutes.patch("/email", UsersRequests.update.email);
accountRoutes.patch("/password", UsersRequests.update.password);

accountRoutes.delete("/", UsersRequests.deleteAccount)

module.exports = accountRoutes;