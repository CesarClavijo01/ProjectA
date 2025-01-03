const { Router } = require('express');
const usersRoutes = Router();
const { requireUser } = require('../middleware');
const { users: usersController } = require("../controllers")
const responses = require('../responses')

const accountRoutes = require("./account");
usersRoutes.use("/account", requireUser, accountRoutes)

usersRoutes.post("/register", usersController.register);

usersRoutes.post("/login", usersController.login);

usersRoutes.get("/search", usersController.searchByUsername);

usersRoutes.get("/:userId", usersController.getById);

module.exports = usersRoutes;