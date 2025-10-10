const Process = require("../models/processModel.js");


// ✅ Create Process
const createProcess = async (req, res) => {
  try {
    console.log("Body:", req.body);
    console.log("Files:", req.files);

    // 🧩 Convert multer.any() file array → fieldname map
    const fileMap = {};
    req.files.forEach((file) => {
      if (!fileMap[file.fieldname]) fileMap[file.fieldname] = [];
      fileMap[file.fieldname].push(file);
    });

    // 🧩 Handle main images (optional)
    if (fileMap["og_image"] && fileMap["og_image"].length > 0) {
      req.body.og_image = "uploads/" + fileMap["og_image"][0].filename;
    }

    if (fileMap["bgImg"] && fileMap["bgImg"].length > 0) {
      req.body.bgImg = "uploads/" + fileMap["bgImg"][0].filename;
    }

    // 🧩 Build details array
    const details = [];

    // Collect text fields like details[0].title, details[0].description
    Object.keys(req.body).forEach((key) => {
      const match = key.match(/^details\[(\d+)\]\.(.+)$/);
      if (match) {
        const index = parseInt(match[1]);
        const field = match[2];
        if (!details[index]) details[index] = {};
        details[index][field] = req.body[key];
      }
    });

    // 🧩 Attach icons (e.g., details[0].icon)
    req.files.forEach((file) => {
      const match = file.fieldname.match(/^details\[(\d+)\]\.icon$/);
      if (match) {
        const index = parseInt(match[1]);
        if (!details[index]) details[index] = {};
        details[index].icon = "uploads/" + file.filename;
      }
    });

    if (details.length > 0) {
      req.body.details = details;
    }

    // 🧩 Save to DB
    const process = await Process.create(req.body);

    return res.status(201).json({
      status: true,
      message: "Process created successfully",
      data: process,
    });
  } catch (error) {
    console.error("Create Process Error:", error);
    return res.status(500).json({ status: false, message: error.message });
  }
};


// ✅ Get All Processes
const getAllProcess = async (req, res) => {
    try {
        const processes = await Process.find().sort({ createdAt: -1 });
        if (processes.length > 0)
            return res.status(200).send({
                status: true,
                message: "Processes fetched successfully",
                data: processes,
            });

        return res.status(404).send({
            status: false,
            message: "No processes found",
        });
    } catch (error) {
        res.status(400).send({ status: false, message: error.message });
    }
};

// ✅ Get Process by ID
const getProcessById = async (req, res) => {
    try {
        const process = await Process.findById(req.params.id);
        if (process)
            return res.status(200).send({
                status: true,
                message: "Process fetched successfully",
                data: process,
            });

        return res.status(404).send({
            status: false,
            message: "Process not found",
        });
    } catch (error) {
        res.status(400).send({ status: false, message: error.message });
    }
};

// ✅ Update Process
const updateProcess = async (req, res) => {
    try {
        if (req.files) {
            if (req.files["og_image"]) {
                req.body.og_image = "uploads/" + req.files["og_image"][0].filename;
            }
            if (req.files["bgImg"]) {
                req.body.bgImg = "uploads/" + req.files["bgImg"][0].filename;
            }
        }

        if (req.files && req.files["icons"]) {
            const iconFiles = req.files["icons"];
            if (req.body.details && typeof req.body.details === "string") {
                req.body.details = JSON.parse(req.body.details);
            }

            if (Array.isArray(req.body.details)) {
                req.body.details = req.body.details.map((detail, index) => ({
                    ...detail,
                    icon: iconFiles[index]
                        ? "uploads/" + iconFiles[index].filename
                        : detail.icon,
                }));
            }
        }

        const process = await Process.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });

        if (process)
            return res.status(200).send({
                status: true,
                message: "Process updated successfully",
                data: process,
            });

        return res.status(404).send({
            status: false,
            message: "Process not found",
        });
    } catch (error) {
        res.status(400).send({ status: false, message: error.message });
    }
};

// ✅ Delete Process
const deleteProcess = async (req, res) => {
    try {
        const process = await Process.findByIdAndDelete(req.params.id);
        if (process)
            return res.status(200).send({
                status: true,
                message: "Process deleted successfully",
                data: process,
            });

        return res.status(404).send({
            status: false,
            message: "Process not found",
        });
    } catch (error) {
        res.status(400).send({ status: false, message: error.message });
    }
};

module.exports = {
    createProcess,
    getAllProcess,
    getProcessById,
    updateProcess,
    deleteProcess,
};
