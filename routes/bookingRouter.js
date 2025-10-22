const express = require("express");
const bookingRouter = express.Router();
const bookingController = require("../controllers/bookingController");
const upload = require("../services/imgService")
 
bookingRouter.post("/", upload.fields([{ name: "og_image", maxCount: 1 }]), bookingController.createBooking);
bookingRouter.get("/", bookingController.getAllBookings);
bookingRouter.get("/:id", bookingController.getBookingById);
bookingRouter.put("/:id", upload.fields([{ name: "og_image", maxCount: 1 }]), bookingController.updateBooking);
bookingRouter.delete("/:id", bookingController.deleteBooking);

module.exports = bookingRouter;
