const Ideas = require("../models/ideasModel");

// ✅ Create Idea
const createIdea = async (req, res) => {
  try {
    const body = req.body;
    const details = [];

    // 1️⃣ Collect detail text fields
    Object.keys(body).forEach((key) => {
      const match = key.match(/^detail\[(\d+)\]\.(.+)$/);
      if (match) {
        const index = parseInt(match[1]);
        const field = match[2];
        if (!details[index]) details[index] = {};
        details[index][field] = body[key];
      }
    });

    // 2️⃣ Attach images from files
    if (req.files && req.files.length > 0) {
      req.files.forEach((file) => {
        if (file.fieldname === "og_image") {
          body.og_image = "uploads/" + file.filename;
        } else {
          const match = file.fieldname.match(/^detail\[(\d+)\]\.image$/);
          if (match) {
            const index = parseInt(match[1]);
            if (!details[index]) details[index] = {};
            details[index].image = "uploads/" + file.filename;
          }
        }
      });
    }

    if (details.length > 0) body.detail = details;

    // 3️⃣ Save to database
    const idea = await Ideas.create(body);
    return res.status(201).json({ status: true, message: "Idea created successfully", data: idea });

  } catch (error) {
    console.error("Create Idea Error:", error);
    return res.status(500).json({ status: false, message: error.message });
  }
};

// ✅ Get all Ideas
const getAllIdeas = async (req, res) => {
  try {
    const ideas = await Ideas.find().sort({ createdAt: -1 });
    if (!ideas.length) return res.status(404).send({ status: false, message: "No ideas found" });
    res.status(200).send({ status: true, message: "Ideas fetched successfully", data: ideas });
  } catch (error) {
    res.status(400).send({ status: false, message: error.message });
  }
};

// ✅ Get Idea by ID
const getIdeaById = async (req, res) => {
  try {
    const idea = await Ideas.findById(req.params.id);
    if (!idea) return res.status(404).send({ status: false, message: "Idea not found" });
    res.status(200).send({ status: true, message: "Idea fetched successfully", data: idea });
  } catch (error) {
    res.status(400).send({ status: false, message: error.message });
  }
};

// ✅ Update Idea
// ✅ Update Idea Controller
const updateIdea = async (req, res) => {
  try {
    const {
      title,
      subTitle,
      metaTitle,
      metaDescription,
      keywords,
      ogTitle,
      ogDescription,
      ogUrl,
      ogType,
      status,
    } = req.body;

    // ✅ Rebuild detail array
    const detailTitles = req.body["detail_title[]"] || req.body.detail_title || [];
    const detailDescriptions = req.body["detail_description[]"] || req.body.detail_description || [];
    const detailDates = req.body["detail_date[]"] || req.body.detail_date || [];
    const detailImages = [];

    // ✅ Handle uploaded images
    if (req.files) {
      // OG image
      if (req.files.editOgImage) {
        req.body.ogImage = "uploads/" + req.files.editOgImage[0].filename;
      }

      // Detail images
      if (req.files["detail_image[]"]) {
        req.files["detail_image[]"].forEach((file) => {
          detailImages.push("uploads/" + file.filename);
        });
      }
    }

    // ✅ Merge details
    const details = [];
    const count = Math.max(detailTitles.length, detailDescriptions.length, detailImages.length, detailDates.length);

    for (let i = 0; i < count; i++) {
      details.push({
        title: Array.isArray(detailTitles) ? detailTitles[i] : detailTitles,
        description: Array.isArray(detailDescriptions) ? detailDescriptions[i] : detailDescriptions,
        date: Array.isArray(detailDates) ? detailDates[i] : detailDates,
        image: detailImages[i] || "", // keep old image if no new one uploaded
      });
    }

    // ✅ Construct update object
    const updatedData = {
      title,
      subTitle,
      metaTitle,
      metaDescription,
      keywords,
      ogTitle,
      ogDescription,
      ogUrl,
      ogType,
      status: status === "true",
      detail: details,
    };

    // ✅ Update DB
    const idea = await Ideas.findByIdAndUpdate(req.params.id, updatedData, { new: true });

    if (!idea) {
      return res.status(404).send({ status: false, message: "Idea not found" });
    }

    res.status(200).send({
      status: true,
      message: "Idea updated successfully",
      data: idea,
    });
  } catch (error) {
    console.error("Error updating idea:", error);
    res.status(400).send({ status: false, message: error.message });
  }
};

// ✅ Delete Idea
const deleteIdea = async (req, res) => {
  try {
    const idea = await Ideas.findByIdAndDelete(req.params.id);
    if (!idea) return res.status(404).send({ status: false, message: "Idea not found" });
    res.status(200).send({ status: true, message: "Idea deleted successfully", data: idea });
  } catch (error) {
    res.status(400).send({ status: false, message: error.message });
  }
};

module.exports = {
  createIdea,
  getAllIdeas,
  getIdeaById,
  updateIdea,
  deleteIdea
};
