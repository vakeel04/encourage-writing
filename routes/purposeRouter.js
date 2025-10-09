const express = require("express");
const purposeController = require("../controllers/purposeContoller");

const purposeRouter = express();

purposeRouter.post("/", purposeController.createPurpose);
purposeRouter.get("/", purposeController.getAllPurpose);
purposeRouter.get("/:id", purposeController.getPurposeById);
purposeRouter.put("/:id", purposeController.updatePurpose);
purposeRouter.delete("/:id", purposeController.deletePurpose);

module.exports = purposeRouter;
