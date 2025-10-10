const Purpose = require("../models/purposeModel.js")
// 🟢 Create Purpose
const createPurpose = async (req, res) => {
  try {
    console.log("Body:", req.body);
    console.log("Files:", req.files);

    const details = [];

    // 🧩 Collect text fields like title, description for each detail
    Object.keys(req.body).forEach((key) => {
      const match = key.match(/^details\[(\d+)\]\.(.+)$/);
      if (match) {
        const index = parseInt(match[1]);
        const field = match[2];
        if (!details[index]) details[index] = {};
        details[index][field] = req.body[key];
      }
    });

    // 🧩 Attach icons for each detail (single file)
    req.files.forEach((file) => {
      const match = file.fieldname.match(/^details\[(\d+)\]\.icon$/);
      if (match) {
        const index = parseInt(match[1]);
        if (!details[index]) details[index] = {};
        details[index].icon = "uploads/" + file.filename;
      }
    });

    req.body.details = details;

    // 🧩 Save in DB
    const purpose = await Purpose.create(req.body);

    res.status(201).json({
      status: true,
      message: "Purpose created successfully",
      data: purpose,
    });
  } catch (error) {
    console.error("Create Purpose Error:", error);
    res.status(500).json({ status: false, message: error.message });
  }
};

// 🟢 Get All
const getAllPurpose = async (req, res) => {
  try {
    const purposes = await Purpose.find().sort({ createdAt: -1 });
    res.status(200).json({
      status: true,
      message: "Purposes fetched successfully",
      data: purposes,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

// 🟢 Get by ID
const getPurposeById = async (req, res) => {
  try {
    const purpose = await Purpose.findById(req.params.id);
    if (!purpose)
      return res.status(404).json({ status: false, message: "Purpose not found" });

    res.status(200).json({
      status: true,
      message: "Purpose fetched successfully",
      data: purpose,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

// 🟢 Update Purpose
const updatePurpose = async (req, res) => {
  try {
    console.log("Body:", req.body);
    console.log("Files:", req.files);

    const details = [];

    Object.keys(req.body).forEach((key) => {
      const match = key.match(/^details\[(\d+)\]\.(.+)$/);
      if (match) {
        const index = parseInt(match[1]);
        const field = match[2];
        if (!details[index]) details[index] = {};
        details[index][field] = req.body[key];
      }
    });

    req.files.forEach((file) => {
      const match = file.fieldname.match(/^details\[(\d+)\]\.icon$/);
      if (match) {
        const index = parseInt(match[1]);
        if (!details[index]) details[index] = {};
        details[index].icon = "uploads/" + file.filename;
      }
    });

    req.body.details = details;

    const purpose = await Purpose.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!purpose)
      return res.status(404).json({ status: false, message: "Purpose not found" });

    res.status(200).json({
      status: true,
      message: "Purpose updated successfully",
      data: purpose,
    });
  } catch (error) {
    console.error("Update Purpose Error:", error);
    res.status(500).json({ status: false, message: error.message });
  }
};

// 🟢 Delete Purpose
const deletePurpose = async (req, res) => {
  try {
    const purpose = await Purpose.findByIdAndDelete(req.params.id);
    if (!purpose)
      return res.status(404).json({ status: false, message: "Purpose not found" });

    res.status(200).json({
      status: true,
      message: "Purpose deleted successfully",
      data: purpose,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

module.exports = {
  createPurpose,
  getAllPurpose,
  getPurposeById,
  updatePurpose,
  deletePurpose,
};
