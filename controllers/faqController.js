const FAQ = require("../models/faqModel");

// ======================== CREATE FAQ ========================
const createFAQ = async (req, res) => {
  try {
    // 1️⃣ Handle OG image upload (if available)
    if (req.files && req.files["og_image"] && req.files["og_image"][0]) {
      req.body.og_image = "uploads/" + req.files["og_image"][0].filename;
    }

    // 2️⃣ Parse detail array safely
    // detail can come as stringified JSON (from frontend) or normal object array
    if (typeof req.body.detail === "string") {
      req.body.detail = JSON.parse(req.body.detail);
    }

    // 3️⃣ Validate required fields
    const { usedBy, heading, subHeading, detail } = req.body;
    if (!usedBy || !heading || !subHeading) {
      return res
        .status(400)
        .send({ status: false, message: "All main fields are required." });
    }

    if (!Array.isArray(detail) || detail.length === 0) {
      return res
        .status(400)
        .send({
          status: false,
          message: "At least one question-answer pair is required.",
        });
    }

    // 4️⃣ Create document in DB
    const faq = await FAQ.create(req.body);

    // 5️⃣ Success response
    return res.status(201).send({
      status: true,
      message: "FAQ created successfully.",
      data: faq,
    });
  } catch (error) {
    console.error("❌ Error creating FAQ:", error);
    res.status(500).send({
      status: false,
      message: "Something went wrong while creating FAQ.",
      error: error.message,
    });
  }
};

// Get All FAQs
const getAllFAQ = async (req, res) => {
  try {
    const faqs = await FAQ.find().sort({ createdAt: -1 });
    if (faqs.length > 0)
      return res
        .status(200)
        .send({
          status: true,
          message: "FAQs fetched successfully",
          data: faqs,
        });

    return res.status(404).send({ status: false, message: "No FAQ found" });
  } catch (error) {
    res.status(400).send({ status: false, message: error.message });
  }
};

// Get FAQ by ID
const getFAQById = async (req, res) => {
  try {
    const faq = await FAQ.findById(req.params.id);
    if (faq)
      return res
        .status(200)
        .send({ status: true, message: "FAQ fetched successfully", data: faq });

    return res.status(404).send({ status: false, message: "FAQ not found" });
  } catch (error) {
    res.status(400).send({ status: false, message: error.message });
  }
};

// Update FAQ
const updateFAQ = async (req, res) => {
  try {
    // Update OG image if provided
    if (req.files && req.files["og_image"]) {
      req.body.og_image = "uploads/" + req.files["og_image"][0].filename;
    }

    const faq = await FAQ.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (faq)
      return res
        .status(200)
        .send({ status: true, message: "FAQ updated successfully", data: faq });

    return res.status(404).send({ status: false, message: "FAQ not found" });
  } catch (error) {
    res.status(400).send({ status: false, message: error.message });
  }
};

// Delete FAQ
const deleteFAQ = async (req, res) => {
  try {
    const faq = await FAQ.findByIdAndDelete(req.params.id);
    if (faq)
      return res
        .status(200)
        .send({ status: true, message: "FAQ deleted successfully", data: faq });

    return res.status(404).send({ status: false, message: "FAQ not found" });
  } catch (error) {
    res.status(400).send({ status: false, message: error.message });
  }
};

module.exports = {
  createFAQ,
  getAllFAQ,
  getFAQById,
  updateFAQ,
  deleteFAQ,
};
