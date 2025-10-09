const express = require("express");
const achievementController = require("../controllers/achievementContoller");
const achievementRouter = express();

 
achievementRouter.post("/", achievementController.createAchievement);
achievementRouter.get("/", achievementController.getAchievements);
achievementRouter.get("/:id", achievementController.getAchievementById);
achievementRouter.put("/:id", achievementController.updateAchievement);
achievementRouter.delete("/:id", achievementController.deleteAchievement);

module.exports = achievementRouter;
