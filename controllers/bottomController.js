const Bottom = require("../models/bottomModel");



const createBottom = async (req, res) => {
    try {
      const body = req.body;
  
      // 🧩 Handle detail — convert stringified array → real array
      if (body.detail) {
        if (typeof body.detail === "string") {
          try {
            // Agar string JSON format me ho
            const parsed = JSON.parse(body.detail);
            body.detail = Array.isArray(parsed) ? parsed : [parsed];
          } catch {
            // Agar sirf ek string aayi ho
            body.detail = [body.detail];
          }
        } else if (!Array.isArray(body.detail)) {
          // Agar kisi aur type ki value aayi ho
          body.detail = [body.detail];
        }
      } else {
        body.detail = [];
      }
  
      // 🧩 Handle uploaded files (multer)
      if (req.files) {
        if (req.files.image) body.image = "uploads/" + req.files.image[0].filename;
        if (req.files.og_image) body.og_image = "uploads/" + req.files.og_image[0].filename;
      }
  
      // 🧩 Create Bottom document
      const bottom = await Bottom.create(body);
  
      return res.status(201).send({
        status: true,
        message: "Bottom created successfully",
        data: bottom,
      });
    } catch (error) {
      console.error("Create Bottom Error:", error);
      res.status(400).send({ status: false, message: error.message });
    }
  };
  
// Update Bottom with images
const updateBottom = async (req, res) => {
    try {
        const body = req.body;

        if (req.files) {
            if (req.files.image) body.image = req.files.image[0].path;
            if (req.files.og_image) body.og_image = req.files.og_image[0].path;
        }

        const bottom = await Bottom.findByIdAndUpdate(req.params.id, body, { new: true });
        if (!bottom) return res.status(404).send({ status: false, message: "Bottom not found" });

        return res.status(200).send({ status: true, message: "Bottom updated successfully", data: bottom });
    } catch (error) {
        res.status(400).send({ status: false, message: error.message });
    }
};

// Other controllers remain the same
const getAllBottoms = async (req, res) => {
    try {
        const bottoms = await Bottom.find().sort({ createdAt: -1 });
        if (!bottoms.length) return res.status(404).send({ status: false, message: "No bottom records found" });
        res.status(200).send({ status: true, message: "Bottoms fetched successfully", data: bottoms });
    } catch (error) {
        res.status(400).send({ status: false, message: error.message });
    }
};

const getBottomById = async (req, res) => {
    try {
        const bottom = await Bottom.findById(req.params.id);
        if (!bottom) return res.status(404).send({ status: false, message: "Bottom not found" });
        res.status(200).send({ status: true, message: "Bottom fetched successfully", data: bottom });
    } catch (error) {
        res.status(400).send({ status: false, message: error.message });
    }
};

const deleteBottom = async (req, res) => {
    try {
        const bottom = await Bottom.findByIdAndDelete(req.params.id);
        if (!bottom) return res.status(404).send({ status: false, message: "Bottom not found" });
        res.status(200).send({ status: true, message: "Bottom deleted successfully", data: bottom });
    } catch (error) {
        res.status(400).send({ status: false, message: error.message });
    }
};

module.exports = {
    createBottom,
    getAllBottoms,
    getBottomById,
    updateBottom,
    deleteBottom
};
