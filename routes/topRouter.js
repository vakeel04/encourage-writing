const express = require("express");
const topController = require("../controllers/topController");
const upload = require("../services/imgService"); 

const topRouter = express.Router();

// Routes with image upload
topRouter.post("/", upload.fields([{ name: "image" }, { name: "og_image" }, { name: "bgImg" }]), topController.createTop);
topRouter.put("/:id", upload.fields([{ name: "image" }, { name: "og_image" }, { name: "bgImg" }]), topController.updateTop);

// GET & DELETE
topRouter.get("/", topController.getAllTops);
topRouter.get("/:id", topController.getTopById);
topRouter.delete("/:id", topController.deleteTop);

module.exports = topRouter;
