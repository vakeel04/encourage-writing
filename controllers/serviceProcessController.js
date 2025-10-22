const ServiceProcess = require("../models/serviceProcessModel");

 

// 🟢 Create Service Process
const createServiceProcess = async (req, res) => {
  try {
    // ✅ Check required field
    if (!req.body.heading || !req.body.usedBy) {
      return res.status(400).json({
        status: false,
        message: "Heading and usedBy are required fields",
      });
    }

    // 🧩 Handle bgImg & og_image
    if (req.files) {
      const bgImgFile = req.files.find(f => f.fieldname === "bgImg");
      const ogImgFile = req.files.find(f => f.fieldname === "og_image");

      if (bgImgFile) req.body.bgImg = "uploads/" + bgImgFile.filename;
      if (ogImgFile) req.body.og_image = "uploads/" + ogImgFile.filename;
    }

    // 🧠 Step 1: Convert details[0].title, etc. → array
    const details = [];
    Object.keys(req.body).forEach((key) => {
      const match = key.match(/^details\[(\d+)\]\.(.+)$/);
      if (match) {
        const index = Number(match[1]);
        const field = match[2];
        if (!details[index]) details[index] = {};
        details[index][field] = req.body[key];
        delete req.body[key];
      }
    });

    // 🧠 Step 2: Attach icons from req.files
    if (req.files && req.files.length > 0) {
      req.files.forEach((file) => {
        const match = file.fieldname.match(/^details\[(\d+)\]\.icon$/);
        if (match) {
          const index = Number(match[1]);
          if (!details[index]) details[index] = {};
          details[index].icon = "uploads/" + file.filename;
        }
      });
    }

    // 🧠 Step 3: Assign back
    if (details.length > 0) req.body.details = details;

    console.log("🧩 Final Body:", req.body);

    // 🧩 Step 4: Save to DB
    const newServiceProcess = await ServiceProcess.create(req.body);

    return res.status(201).json({
      status: true,
      message: "Service process created successfully",
      data: newServiceProcess,
    });
  } catch (error) {
    console.error("Create Service Process Error:", error);
    return res.status(500).json({ status: false, message: error.message });
  }
};


// 🟢 Get All Service Processes
const getAllServiceProcesses = async (req, res) => {
  try {
    const processes = await ServiceProcess.find().sort({ createdAt: -1 });
    if (processes.length === 0)
      return res
        .status(404)
        .json({ status: false, message: "No service processes found" });

    return res.status(200).json({
      status: true,
      message: "Service processes fetched successfully",
      data: processes,
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

// 🟢 Get Service Process by ID
const getServiceProcessById = async (req, res) => {
  try {
    const process = await ServiceProcess.findById(req.params.id);
    if (!process)
      return res
        .status(404)
        .json({ status: false, message: "Service process not found" });

    return res.status(200).json({
      status: true,
      message: "Service process fetched successfully",
      data: process,
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

// 🟢 Update Service Process
const updateServiceProcess = async (req, res) => {
  try {
    if (req.files && req.files.bgImg) {
      req.body.bgImg = "uploads/" + req.files.bgImg[0].filename;
    }

    if (req.files && req.files.og_image) {
      req.body.og_image = "uploads/" + req.files.og_image[0].filename;
    }

    const updated = await ServiceProcess.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated)
      return res
        .status(404)
        .json({ status: false, message: "Service process not found" });

    return res.status(200).json({
      status: true,
      message: "Service process updated successfully",
      data: updated,
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

// 🟢 Delete Service Process
const deleteServiceProcess = async (req, res) => {
  try {
    const deleted = await ServiceProcess.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res
        .status(404)
        .json({ status: false, message: "Service process not found" });

    return res.status(200).json({
      status: true,
      message: "Service process deleted successfully",
      data: deleted,
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

module.exports = {
  createServiceProcess,
  getAllServiceProcesses,
  getServiceProcessById,
  updateServiceProcess,
  deleteServiceProcess,
};
