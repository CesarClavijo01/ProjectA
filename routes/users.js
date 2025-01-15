const { Router } = require('express');
const usersRoutes = Router();
const { UsersRequests } = require("../HTTP");
const { registerLimiter, loginLimiter } = require('../rateLimiters');

usersRoutes.post("/register", registerLimiter, UsersRequests.register);

usersRoutes.post("/login", loginLimiter, UsersRequests.login);

usersRoutes.get("/search", UsersRequests.searchByUsername);

usersRoutes.get("/:userId", UsersRequests.getUserById);

// GET /verify

module.exports = usersRoutes;