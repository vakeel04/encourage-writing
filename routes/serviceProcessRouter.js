const express = require("express");
const serviceProcessController = require("../controllers/serviceProcessController.js");
const upload = require("../services/imgService.js");

const serviceProcessRouter = express();

// ✅ Multer fields setup
serviceProcessRouter.post("/",upload.any(),serviceProcessController.createServiceProcess);
serviceProcessRouter.get("/", serviceProcessController.getAllServiceProcesses);
serviceProcessRouter.get("/:id", serviceProcessController.getServiceProcessById);
serviceProcessRouter.put("/:id",upload.any(),serviceProcessController.updateServiceProcess);

serviceProcessRouter.delete("/:id", serviceProcessController.deleteServiceProcess);

module.exports = serviceProcessRouter;
