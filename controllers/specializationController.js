const Specialization = require("../models/specializationModel");

// 🟢 Create Specialization
const createSpecialization = async (req, res) => {
    try {
      const body = req.body;
      console.log(req.files);
      
      const specialization = [];
  
      // 🧩 Convert keys like 'specialization[0].title' → specialization array
      Object.keys(body).forEach(key => {
        const match = key.match(/^specialization\[(\d+)\]\.(.+)$/);
        if (match) {
          const index = Number(match[1]);
          const field = match[2];
          if (!specialization[index]) specialization[index] = {};
          
          // Try to parse includes array
          if (field === "includes") {
            try {
              specialization[index][field] = JSON.parse(body[key]);
            } catch {
              specialization[index][field] = [body[key]];
            }
          } else {
            specialization[index][field] = body[key];
          }
        }
      });
  
      body.specialization = specialization;
  
      if (req.files && req.files.length) {
        req.files.forEach(file => {
          const match = file.fieldname.match(/^specialization\[(\d+)\]\.icon$/);
          if (match) {
            const index = Number(match[1]);
            if (!body.specialization[index]) body.specialization[index] = {};
            body.specialization[index].icon = "uploads/" + file.filename;
          }
      
          if (file.fieldname === "og_image") {
            body.og_image = "uploads/" + file.filename;
          }
        });
      }
      const specializationDoc = await Specialization.create(body);
  
      res.status(201).send({
        status: true,
        message: "Specialization created successfully",
        data: specializationDoc,
      });
    } catch (error) {
      console.error("Create Specialization Error:", error);
      res.status(400).send({ status: false, message: error.message });
    }
  };
  

// 🟢 Update Specialization
const updateSpecialization = async (req, res) => {
  try {
    const body = req.body;

    // Handle uploaded files
    if (req.files) {
      const ogImgFile = req.files.find(f => f.fieldname === "og_image");
      if (ogImgFile) body.og_image = "uploads/" + ogImgFile.filename;

      req.files.forEach(file => {
        const match = file.fieldname.match(/^specialization\[(\d+)\]\.icon$/);
        if (match) {
          const index = Number(match[1]);
          if (!body.specialization) body.specialization = [];
          if (!body.specialization[index]) body.specialization[index] = {};
          body.specialization[index].icon = "uploads/" + file.filename;
        }
      });
    }

    const specialization = await Specialization.findByIdAndUpdate(req.params.id, body, { new: true });
    if (!specialization) return res.status(404).send({ status: false, message: "Specialization not found" });

    res.status(200).send({ status: true, message: "Specialization updated successfully", data: specialization });
  } catch (error) {
    res.status(400).send({ status: false, message: error.message });
  }
};

// 🟢 Get All
const getAllSpecializations = async (req, res) => {
  try {
    const specializations = await Specialization.find().sort({ createdAt: -1 });
    if (!specializations.length) return res.status(404).send({ status: false, message: "No records found" });
    res.status(200).send({ status: true, message: "Specializations fetched successfully", data: specializations });
  } catch (error) {
    res.status(400).send({ status: false, message: error.message });
  }
};

// 🟢 Get by ID
const getSpecializationById = async (req, res) => {
  try {
    const specialization = await Specialization.findById(req.params.id);
    if (!specialization) return res.status(404).send({ status: false, message: "Specialization not found" });
    res.status(200).send({ status: true, message: "Specialization fetched successfully", data: specialization });
  } catch (error) {
    res.status(400).send({ status: false, message: error.message });
  }
};

// 🟢 Delete
const deleteSpecialization = async (req, res) => {
  try {
    const specialization = await Specialization.findByIdAndDelete(req.params.id);
    if (!specialization) return res.status(404).send({ status: false, message: "Specialization not found" });
    res.status(200).send({ status: true, message: "Specialization deleted successfully", data: specialization });
  } catch (error) {
    res.status(400).send({ status: false, message: error.message });
  }
};

module.exports = {
  createSpecialization,
  updateSpecialization,
  getAllSpecializations,
  getSpecializationById,
  deleteSpecialization,
};
