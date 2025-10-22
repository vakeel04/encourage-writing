const express = require("express");
const serviceController = require("../controllers/serviceContoller.js");
const upload = require("../services/imgService.js")

const serviceRouter = express();

serviceRouter.post("/", upload.fields([{ name: "image" }, { name: "og_image" }]), serviceController.createService);
serviceRouter.get("/", serviceController.getAllServices);
serviceRouter.get("/:id", serviceController.getServiceById);
serviceRouter.put("/:id",upload.fields([{ name: "image" }, { name: "og_image" }]),  serviceController.updateService);
serviceRouter.delete("/:id", serviceController.deleteService);

module.exports = serviceRouter;
