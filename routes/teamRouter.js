const express = require("express");
const teamController = require("../controllers/teamController.js");
const upload = require("../services/imgService.js")

const teamRouter = express();

teamRouter.post("/",upload.fields([{name:"image"},{name:"og_image"}]), teamController.createTeam);
teamRouter.get("/", teamController.getAllTeams);
teamRouter.get("/:id", teamController.getTeamById);
teamRouter.put("/:id",upload.fields([{name:"image"},{name:"og_image"}]),teamController.updateTeam);
teamRouter.delete("/:id", teamController.deleteTeam);

module.exports = teamRouter;
