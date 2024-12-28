const { Router } = require('express');
const usersRoutes = Router();
const { requireUser } = require('../middleware');
const { users: usersController } = require("../controllers")
const responses = require('../responses')

usersRoutes.post("/register", usersController.register);

usersRoutes.post("/login", usersController.login);

usersRoutes.get("/search", usersController.searchByUsername);

usersRoutes.get("/:userId", usersController.getById);

// GET /verify

module.exports = usersRoutes;