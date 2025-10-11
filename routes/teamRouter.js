const express = require("express");
const teamController = require("../controllers/teamController.js");
const upload = require("../services/imgService.js")

const teamRouter = express.Router();

teamRouter.post("/",upload.any(), teamController.createTeam);
teamRouter.get("/", teamController.getAllTeams);
teamRouter.get("/:id", teamController.getTeamById);
teamRouter.put("/:id",upload.any(),teamController.updateTeam);
teamRouter.delete("/:id", teamController.deleteTeam);

module.exports = teamRouter;
