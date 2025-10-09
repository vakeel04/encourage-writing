const express = require("express");
const processController = require("../controllers/processController.js");
const upload = require("../services/imgService.js");


const processRouter = express();

processRouter.post("/",upload.single("og_image"), processController.createProcess);
processRouter.get("/", processController.getAllProcess);
processRouter.get("/:id", processController.getProcessById);
processRouter.put("/:id",  upload.single("og_image"), processController.updateProcess);
processRouter.delete("/:id", processController.deleteProcess);

module.exports = processRouter;
