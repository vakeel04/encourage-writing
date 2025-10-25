const Partner = require("../models/partnerModel.js");

 
const createPartner = async (req, res) => {
    try {
 
        if (req.files && req.files["images"]) {
            req.body.images = req.files["images"].map(file => "uploads/" + file.filename);
        }

        if (req.files && req.files["og_image"]) {
            req.body.og_image = "uploads/" + req.files["og_image"][0].filename;
        }

        const partner = await Partner.create(req.body);

        if (partner)
            return res.status(201).send({ status: true, message: "Partner created successfully", data: partner });

        return res.status(400).send({ status: false, message: "Failed to create partner" });
    } catch (error) {
        res.status(400).send({ status: false, message: error.message });
    }
};

 
const getAllPartners = async (req, res) => {
    try {
        const partners = await Partner.find().sort({ createdAt: -1 });
        if (partners.length > 0)
            return res.status(200).send({ status: true, message: "Partners fetched successfully", data: partners });

        return res.status(404).send({ status: false, message: "No partners found" });
    } catch (error) {
        res.status(400).send({ status: false, message: error.message });
    }
};
 
const getPartnerById = async (req, res) => {
    try {
        const partner = await Partner.findById(req.params.id);
        if (partner)
            return res.status(200).send({ status: true, message: "Partner fetched successfully", data: partner });
        return res.status(404).send({ status: false, message: "Partner not found" });
    } catch (error) {
        res.status(400).send({ status: false, message: error.message });
    }
};

 
const updatePartner = async (req, res) => {
    try {
        let currentImages = JSON.parse(req.body.existingImages || "[]"); // images that remain
        if (req.body.removedImages) {
          const removed = JSON.parse(req.body.removedImages);
          currentImages = currentImages.filter(img => !removed.includes(img));
        }
  
      // Add new uploaded images
      if (req.files && req.files["images"]) {
        const newImages = req.files["images"].map(file => "uploads/" + file.filename);
        currentImages = [...currentImages, ...newImages];
      }
  
      req.body.images = currentImages;
  
      // Handle OG Image
      if (req.files && req.files["og_image"]) {
        req.body.og_image = "uploads/" + req.files["og_image"][0].filename;
      }
  
      // Convert status to boolean
      req.body.status = req.body.status === "on" ? true : false;
  
      const partner = await Partner.findByIdAndUpdate(req.params.id, req.body, { new: true });
  
      if (partner)
        return res.status(200).send({ status: true, message: "Partner updated successfully", data: partner });
  
      return res.status(404).send({ status: false, message: "Partner not found" });
    } catch (error) {
      res.status(400).send({ status: false, message: error.message });
    }
  };

 
const deletePartner = async (req, res) => {
    try {
        const partner = await Partner.findByIdAndDelete(req.params.id);
        if (partner)
            return res.status(200).send({ status: true, message: "Partner deleted successfully", data: partner });

        return res.status(404).send({ status: false, message: "Partner not found" });
    } catch (error) {
        res.status(400).send({ status: false, message: error.message });
    }
};

module.exports = {
    createPartner,
    getAllPartners,
    getPartnerById,
    updatePartner,
    deletePartner
};
