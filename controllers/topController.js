const Top = require("../models/topModel");

// Create Top with images
const createTop = async (req, res) => {
  try {
    const body = req.body;

    // Handle uploaded files
    if (req.files) {
      if (req.files.image) body.image = "uploads/" + req.files.image[0].filename;
      if (req.files.og_image) body.og_image = "uploads/" + req.files.og_image[0].filename;
      if (req.files.bgImg) body.bgImg = "uploads/" + req.files.bgImg[0].filename;
    }

    const top = await Top.create(body);
    return res.status(201).send({ status: true, message: "Top created successfully", data: top });
  } catch (error) {
    res.status(400).send({ status: false, message: error.message });
  }
};

// Update Top with images
const updateTop = async (req, res) => {
  try {
    const body = req.body;

    if (req.files) {
      if (req.files.image) body.image = "uploads/" + req.files.image[0].filename;
      if (req.files.og_image) body.og_image = "uploads/" + req.files.og_image[0].filename;
    }

    const top = await Top.findByIdAndUpdate(req.params.id, body, { new: true });
    if (!top) return res.status(404).send({ status: false, message: "Top not found" });

    return res.status(200).send({ status: true, message: "Top updated successfully", data: top });
  } catch (error) {
    res.status(400).send({ status: false, message: error.message });
  }
};

// Get all Tops
const getAllTops = async (req, res) => {
  try {
    const tops = await Top.find().sort({ createdAt: -1 });
    if (!tops.length) return res.status(404).send({ status: false, message: "No top records found" });
    res.status(200).send({ status: true, message: "Tops fetched successfully", data: tops });
  } catch (error) {
    res.status(400).send({ status: false, message: error.message });
  }
};

// Get Top by ID
const getTopById = async (req, res) => {
  try {
    const top = await Top.findById(req.params.id);
    if (!top) return res.status(404).send({ status: false, message: "Top not found" });
    res.status(200).send({ status: true, message: "Top fetched successfully", data: top });
  } catch (error) {
    res.status(400).send({ status: false, message: error.message });
  }
};

// Delete Top
const deleteTop = async (req, res) => {
  try {
    const top = await Top.findByIdAndDelete(req.params.id);
    if (!top) return res.status(404).send({ status: false, message: "Top not found" });
    res.status(200).send({ status: true, message: "Top deleted successfully", data: top });
  } catch (error) {
    res.status(400).send({ status: false, message: error.message });
  }
};

module.exports = {
  createTop,
  getAllTops,
  getTopById,
  updateTop,
  deleteTop
};
