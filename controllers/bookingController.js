const Booking = require("../models/bookingModel");

// Create Booking
const createBooking = async (req, res) => {
  try {
    // Optional OG image upload
    if (req.files && req.files['og_image']) {
      req.body.og_image = "uploads/" + req.files['og_image'][0].filename;
    }

    const booking = await Booking.create(req.body);
    if (booking)
      return res.status(201).send({ status: true, message: "Booking created successfully", data: booking });

    return res.status(400).send({ status: false, message: "Failed to create booking" });
  } catch (error) {
    res.status(400).send({ status: false, message: error.message });
  }
};

// Get All Bookings
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    if (bookings.length > 0)
      return res.status(200).send({ status: true, message: "Bookings fetched successfully", data: bookings });

    return res.status(404).send({ status: false, message: "No bookings found" });
  } catch (error) {
    res.status(400).send({ status: false, message: error.message });
  }
};

// Get Booking by ID
const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (booking)
      return res.status(200).send({ status: true, message: "Booking fetched successfully", data: booking });

    return res.status(404).send({ status: false, message: "Booking not found" });
  } catch (error) {
    res.status(400).send({ status: false, message: error.message });
  }
};

// Update Booking
const updateBooking = async (req, res) => {
  try {
    if (req.files && req.files['og_image']) {
      req.body.og_image = "uploads/" + req.files['og_image'][0].filename;
    }

    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (booking)
      return res.status(200).send({ status: true, message: "Booking updated successfully", data: booking });

    return res.status(404).send({ status: false, message: "Booking not found" });
  } catch (error) {
    res.status(400).send({ status: false, message: error.message });
  }
};

// Delete Booking
const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (booking)
      return res.status(200).send({ status: true, message: "Booking deleted successfully", data: booking });

    return res.status(404).send({ status: false, message: "Booking not found" });
  } catch (error) {
    res.status(400).send({ status: false, message: error.message });
  }
};

module.exports = {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking
};
