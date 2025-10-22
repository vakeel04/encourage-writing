const ContactUs = require("../models/contactUsModel.js");

// Create Contact
const createContactUs = async (req, res) => {
  try {
    // Handle OG image upload
    if (req.files && req.files['og_image']) {
      req.body.og_image = "uploads/" + req.files['og_image'][0].filename;
    }
    const contact = await ContactUs.create(req.body);
    if (contact)
      return res.status(201).send({ status: true, message: "Contact message created successfully", data: contact });

    return res.status(400).send({ status: false, message: "Failed to create contact message" });
  } catch (error) {
    res.status(400).send({ status: false, message: error.message });
  }
};

// Get all contacts
const getContactUs = async (req, res) => {
  try {
    const contacts = await ContactUs.find().sort({ createdAt: -1 });
    if (contacts.length > 0)
      return res.status(200).send({ status: true, message: "Contact messages fetched successfully", data: contacts });

    return res.status(404).send({ status: false, message: "No contact messages found" });
  } catch (error) {
    res.status(400).send({ status: false, message: error.message });
  }
};

// Get contact by ID
const getContactUsById = async (req, res) => {
  try {
    const contact = await ContactUs.findById(req.params.id);
    if (contact)
      return res.status(200).send({ status: true, message: "Contact message fetched successfully", data: contact });

    return res.status(404).send({ status: false, message: "Contact message not found" });
  } catch (error) {
    res.status(400).send({ status: false, message: error.message });
  }
};

// Update contact
const updateContactUs = async (req, res) => {
  try {
    // Handle OG image upload if new image provided
    if (req.files && req.files['og_image']) {
      req.body.og_image = "uploads/" + req.files['og_image'][0].filename;
    }

    const contact = await ContactUs.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (contact)
      return res.status(200).send({ status: true, message: "Contact message updated successfully", data: contact });

    return res.status(404).send({ status: false, message: "Contact message not found" });
  } catch (error) {
    res.status(400).send({ status: false, message: error.message });
  }
};

// Delete contact
const deleteContactUs = async (req, res) => {
  try {
    const contact = await ContactUs.findByIdAndDelete(req.params.id);
    if (contact)
      return res.status(200).send({ status: true, message: "Contact message deleted successfully", data: contact });

    return res.status(404).send({ status: false, message: "Contact message not found" });
  } catch (error) {
    res.status(400).send({ status: false, message: error.message });
  }
};

module.exports = {
  createContactUs,
  getContactUs,
  getContactUsById,
  updateContactUs,
  deleteContactUs
};
