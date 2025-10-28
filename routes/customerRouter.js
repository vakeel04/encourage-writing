const express = require("express");
const customerController = require("../controllers/customerController.js");
const customerRouter = express();
const upload = require("../services/imgService.js");

customerRouter.post(
  "/",
  upload.fields([{ name: "image" }, { name: "og_image" }]),
  customerController.createCustomer
);
customerRouter.get("/", customerController.getCustomers);
customerRouter.get("/:id", customerController.getCustomerById);
customerRouter.put(
  "/:id",
  upload.fields([{ name: "image" }, { name: "og_image" }]),
  customerController.updateCustomer
);
customerRouter.delete("/:id", customerController.deleteCustomer);

module.exports = customerRouter;
