const { Router } = require('express');
const usersRoutes = Router();
const { requireUser } = require('../middleware');
const { UsersRequests } = require("../requests");
const responses = require('../responses');

usersRoutes.post("/register", UsersRequests.register);

usersRoutes.post("/login", UsersRequests.login);

usersRoutes.get("/search", UsersRequests.searchByUsername);

usersRoutes.get("/:userId", UsersRequests.getUserById);

// GET /verify

module.exports = usersRoutes;