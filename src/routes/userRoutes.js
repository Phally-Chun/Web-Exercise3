const express = require("express");
const userRoutes = express.Router();
const userController = require("../controllers/userController");
const express = require("express");

userRoutes.get("/users", userController.getAllUserController);

userRoutes.get("/users/:id", userController.getUserByIdController);

userRoutes.post("/users", userController.createNewUserController);

userRoutes.delete("/users", userController.deleteUserByIdController);

module.exports = userRoutes;
