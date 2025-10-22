const express = require("express");
const specializationController = require("../controllers/specializationController.js");
const upload = require("../services/imgService.js");

const specializationRouter = express();

 
specializationRouter.post("/", upload.any(), specializationController.createSpecialization);
specializationRouter.put("/:id", upload.any(), specializationController.updateSpecialization);
specializationRouter.get("/", specializationController.getAllSpecializations);
specializationRouter.get("/:id", specializationController.getSpecializationById);
specializationRouter.delete("/:id", specializationController.deleteSpecialization);

module.exports = specializationRouter;
