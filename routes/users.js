const { Router } = require('express');
const usersRoutes = Router();
const { users: controller } = require("../controllers")
const responses = require('../responses')

usersRoutes.post("/register", controller.register);

usersRoutes.post("/login", controller.login);

usersRoutes.get("/username", (req, res) => { return res.status(200).json(responses.success({ message: "Hit api/users/username" })) });

usersRoutes.get("/:userId", (req, res) => { return res.status(200).json(responses.success({ message: "Hit api/users/:userId" })) });


module.exports = usersRoutes;