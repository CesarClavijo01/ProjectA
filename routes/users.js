const { Router } = require('express');
const usersRoutes = Router();
const { requireUser } = require('../middleware');
const { users: usersController } = require("../controllers")
const responses = require('../responses')

const accountRoutes = require("./account");
usersRoutes.use("/account", requireUser, accountRoutes)

usersRoutes.post("/register", usersController.register);

usersRoutes.post("/login", usersController.login);

usersRoutes.get("/search", (req, res) => { return res.status(200).json(responses.success({ message: "Hit api/users/search" })) });

usersRoutes.get("/:userId", (req, res) => { return res.status(200).json(responses.success({ message: "Hit api/users/:userId" })) });

module.exports = usersRoutes;