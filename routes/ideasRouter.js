const express = require("express");
const ideasController = require("../controllers/ideasController");
const upload = require("../services/imgService");

const ideasRouter = express.Router();

 
ideasRouter.post("/", upload.any(), ideasController.createIdea);
ideasRouter.put("/:id", upload.any(), ideasController.updateIdea);
ideasRouter.get("/", ideasController.getAllIdeas);
ideasRouter.get("/:id", ideasController.getIdeaById);
ideasRouter.delete("/:id", ideasController.deleteIdea);

module.exports = ideasRouter;
