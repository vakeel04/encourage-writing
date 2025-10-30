const Specialization = require("../models/specializationModel");

const createSpecialization = async (req, res) => {
  try {
    const body = req.body;

    // 🟢 Build specialization array from multiple inputs
    const titles = body.specialization_title || [];
    const icons = body.specialization_icon || [];
    const subTitles = body.specialization_subTitle || [];
    const startingAt = body.startingAt || [];
    const turnaround = body.turnaround || [];
    const revisions = body.revisions || [];
    const format = body.format || [];
    const rushDelivery = body.rushDelivery || [];
    const additionalRevisions = body.additionalRevisions || [];
    const editorialCalendarCreation = body.editorialCalendarCreation || [];
    const WordPressPublishing = body.WordPressPublishing || [];
    const includes = body.includes || [];

    const specialization = [];

    for (let i = 0; i < titles.length; i++) {
      specialization.push({
        title: titles[i],
        icon: icons[i] || "",
        subTitle: subTitles[i] || "",
        startingAt: startingAt[i] || "",
        turnaround: turnaround[i] || "",
        revisions: revisions[i] || "",
        format: format[i] || "",
        rushDelivery: rushDelivery[i] || "",
        additionalRevisions: additionalRevisions[i] || "",
        editorialCalendarCreation: editorialCalendarCreation[i] || "",
        WordPressPublishing: WordPressPublishing[i] || "",
        includes: includes[i] ? includes[i].split(",").map(x => x.trim()) : [],
      });
    }

    body.specialization = specialization;

// 🟢 Handle uploaded files
if (req.files && req.files.length) {
  req.files.forEach(file => {
    // OG image
    if (file.fieldname === "og_image") {
      body.og_image = "uploads/" + file.filename;
    }

    // Icon files for specialization items
    const match = file.fieldname.match(/^specialization\[(\d+)\]\.specialization_icon$/);
    if (match) {
      const index = Number(match[1]);
      if (!body.specialization) body.specialization = [];
      if (!body.specialization[index]) body.specialization[index] = {};
      body.specialization[index].icon = "uploads/" + file.filename;
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
