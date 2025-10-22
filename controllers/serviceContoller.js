const Service = require("../models/serviceModel");

// 🟢 Create Service
const createService = async (req, res) => {
  try {
    // ✅ Main image required
    if (!req.files || !req.files.image) {
      return res.status(400).json({
        status: false,
        message: "Main image is required",
      });
    }

    // 🧩 Assign main image path
    req.body.image = "uploads/" + req.files.image[0].filename;

    // 🧩 Optional OG image
    if (req.files.og_image) {
      req.body.og_image = "uploads/" + req.files.og_image[0].filename;
    }
    // 🧩 Save new service
    const newService = await Service.create(req.body);
   
    return res.status(201).json({
      status: true,
      message: "Service created successfully",
      data: newService,
    });
  } catch (error) {
    console.error("Create Service Error:", error);
    return res.status(500).json({ status: false, message: error.message });
  }
};

// 🟢 Get All Services
const getAllServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    if (services.length === 0)
      return res.status(404).json({ status: false, message: "No services found" });

    return res.status(200).json({
      status: true,
      message: "Services fetched successfully",
      data: services,
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

// 🟢 Get Service by ID
const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service)
      return res.status(404).json({ status: false, message: "Service not found" });

    return res.status(200).json({
      status: true,
      message: "Service fetched successfully",
      data: service,
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

// 🟢 Update Service
const updateService = async (req, res) => {
  try {
    if (req.files && req.files.image) {
      req.body.image = "uploads/" + req.files.image[0].filename;
    }

    if (req.files && req.files.og_image) {
      req.body.og_image = "uploads/" + req.files.og_image[0].filename;
    }

    const updated = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated)
      return res.status(404).json({ status: false, message: "Service not found" });

    return res.status(200).json({
      status: true,
      message: "Service updated successfully",
      data: updated,
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

// 🟢 Delete Service
const deleteService = async (req, res) => {
  try {
    const deleted = await Service.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ status: false, message: "Service not found" });

    return res.status(200).json({
      status: true,
      message: "Service deleted successfully",
      data: deleted,
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

module.exports = {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
};
