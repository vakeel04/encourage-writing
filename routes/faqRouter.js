const express = require("express");
const faqController = require("../controllers/faqController.js");
const upload = require("../services/imgService.js")

const faqRouter = express();

faqRouter.post("/",upload.single("og_image") ,faqController.createFAQ);
faqRouter.get("/", faqController.getAllFAQ);
faqRouter.get("/:id", faqController.getFAQById);
faqRouter.put("/:id", upload.single("og_image") ,faqController.updateFAQ);
faqRouter.delete("/:id", faqController.deleteFAQ);

module.exports = faqRouter;
 