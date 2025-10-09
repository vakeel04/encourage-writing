const express = require("express");
const contactUsController = require("../controllers/contactUsController.js");
const upload = require("../services/imgService.js")
const contactUsRouter = express();

 
contactUsRouter.post("/",upload.single("og_image") , contactUsController.createContactUs);
contactUsRouter.get("/", contactUsController.getContactUs);
contactUsRouter.get("/:id", contactUsController.getContactUsById);
contactUsRouter.put("/:id",upload.single("og_image") , contactUsController.updateContactUs);
contactUsRouter.delete("/:id", contactUsController.deleteContactUs);

module.exports = contactUsRouter;
