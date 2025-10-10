const express = require("express");
const bottomController = require("../controllers/bottomController");
const upload = require("../services/imgService");

const bottomRouter = express.Router();

 
bottomRouter.post("/", upload.fields([{ name: "image" }, { name: "og_image" }]), bottomController.createBottom);
bottomRouter.put("/:id", upload.fields([{ name: "image" }, { name: "og_image" }]), bottomController.updateBottom);
bottomRouter.get("/", bottomController.getAllBottoms);
bottomRouter.get("/:id", bottomController.getBottomById);
bottomRouter.delete("/:id", bottomController.deleteBottom);

module.exports = bottomRouter;
