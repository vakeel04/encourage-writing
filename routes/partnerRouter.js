const express = require("express");
const partnerController = require("../controllers/partnerController.js");
const upload = require("../services/imgService.js"); 

const partnerRouter = express();

partnerRouter.post("/",upload.fields([{ name: "images", maxCount: 10 }, { name: "og_image", maxCount: 1 }]),partnerController.createPartner);
partnerRouter.get("/", partnerController.getAllPartners);
partnerRouter.get("/:id", partnerController.getPartnerById);
partnerRouter.put("/:id",upload.fields([{ name: "images", maxCount: 10 }, { name: "og_image", maxCount: 1 }]),partnerController.updatePartner);
partnerRouter.delete("/:id", partnerController.deletePartner);

module.exports = partnerRouter;
