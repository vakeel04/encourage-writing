const express = require("express");
const purposeController = require("../controllers/purposeContoller.js");
const upload = require("../services/imgService.js");

const purposeRouter = express.Router();

 
purposeRouter.post("/", upload.any(), purposeController.createPurpose);
purposeRouter.get("/", purposeController.getAllPurpose);
purposeRouter.get("/:id", purposeController.getPurposeById);
purposeRouter.put("/:id", upload.any(), purposeController.updatePurpose);
purposeRouter.delete("/:id", purposeController.deletePurpose);

module.exports = purposeRouter;
