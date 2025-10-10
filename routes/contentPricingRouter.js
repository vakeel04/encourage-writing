const express = require("express");
const contentPricingController = require("../controllers/contentPricingController.js");

const contentPricingRouter = express();

// Routes
contentPricingRouter.post("/", contentPricingController.createContentPricing);
contentPricingRouter.get("/", contentPricingController.getAllContentPricing);
contentPricingRouter.get("/:id", contentPricingController.getContentPricingById);
contentPricingRouter.put("/:id", contentPricingController.updateContentPricing);
contentPricingRouter.delete("/:id", contentPricingController.deleteContentPricing);

module.exports = contentPricingRouter;
