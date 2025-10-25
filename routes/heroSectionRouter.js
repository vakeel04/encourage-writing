const express = require("express");
const heroSectionController = require("../controllers/heroSectionContoller.js");
const upload = require("../services/imgService.js")
const heroSectionRouter = express();

heroSectionRouter.post("/",upload.fields([{ name: "images", maxCount: 10 }]), heroSectionController.createHeroSection);
heroSectionRouter.get("/", heroSectionController.getHeroSections);
heroSectionRouter.get("/:id", heroSectionController.getHeroSectionById);
heroSectionRouter.put("/:id",upload.fields([{ name: "images", maxCount: 10 }]), heroSectionController.updateHeroSection);
heroSectionRouter.delete("/:id", heroSectionController.deleteHeroSection);

module.exports = heroSectionRouter;
