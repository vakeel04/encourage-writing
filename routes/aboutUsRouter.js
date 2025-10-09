const express = require("express");
const aboutUsController = require("../controllers/aboutUsController.js");
const upload = require("../services/imgService.js")

const aboutUsRouter = express();

 
aboutUsRouter.post("/",upload.fields([{ name: "image" }, { name: "og_image" }]), aboutUsController.createAboutUs);
aboutUsRouter.get("/", aboutUsController.getAboutUs);
aboutUsRouter.get("/:id", aboutUsController.getAboutUsById);
aboutUsRouter.put("/:id", upload.fields([{ name: "image" }, { name: "og_image" }]),aboutUsController.updateAboutUs);
aboutUsRouter.delete("/:id", aboutUsController.deleteAboutUs);

module.exports = aboutUsRouter;
