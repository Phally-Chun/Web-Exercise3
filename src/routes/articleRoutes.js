const express = require("express");
const articleRoutes = express.Router();
const articleController = require("../controllers/articleController");
const express = require("express");

articleRoutes.get("/articles", articleController.getAllArticleController);

articleRoutes.get("/articles/:id", articleController.getArticleByIdController);

articleRoutes.post("/articles", articleController.createNewArticleController);

articleRoutes.delete("/articles", articleController.deleteArticleByIdController);

module.exports = articleRoutes;
