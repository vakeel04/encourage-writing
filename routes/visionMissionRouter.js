const express = require("express");
const visionMissionController = require("../controllers/visionMissionController.js");
const upload = require("../services/imgService.js"); // your multer setup

const visionMissionRouter = express();

// Routes
visionMissionRouter.post("/",upload.fields([{ name: "og_image", maxCount: 1 }]),visionMissionController.createVisionMission);
visionMissionRouter.get("/", visionMissionController.getAllVisionMissions);
visionMissionRouter.get("/:id", visionMissionController.getVisionMissionById);
visionMissionRouter.put("/:id",upload.fields([{ name: "og_image", maxCount: 1 }]),visionMissionController.updateVisionMission);
visionMissionRouter.delete("/:id", visionMissionController.deleteVisionMission);

module.exports = visionMissionRouter;
  