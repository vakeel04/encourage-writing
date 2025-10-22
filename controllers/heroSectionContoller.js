const HeroSection = require("../models/heroSectionModel.js");

 
const createHeroSection = async (req, res) => {
    try {
      console.log(req.files);
  
      // Since upload.array() returns an array
      if (!req.files || req.files.length === 0) {
        return res.status(400).send({ status: false, message: "Images are required" });
      }
      // Map image paths
      req.body.images = req.files.map(file => "uploads/" + file.filename);
  
      const heroSection = await HeroSection.create(req.body);
  
      if (heroSection) {
        return res.status(201).send({
          status: true,
          message: "Hero Section created successfully",
          data: heroSection
        });
      }
  
      return res.status(400).send({ status: false, message: "Failed to create Hero Section" });
  
    } catch (error) {
      res.status(400).send({ status: false, message: error.message });
    }
  };
  

 
const getHeroSections = async (req, res) => {
    try {
        const heroSections = await HeroSection.find().sort({ createdAt: -1 });
        if (heroSections.length > 0)
            return res.status(200).send({ status: true, message: "Hero Sections fetched successfully", data: heroSections });

        return res.status(404).send({ status: false, message: "No Hero Sections found" });
    } catch (error) {
        res.status(400).send({ status: false, message: error.message });
    }
};

 
const getHeroSectionById = async (req, res) => {
    try {
        const heroSection = await HeroSection.findById(req.params.id);
        if (heroSection)
            return res.status(200).send({ status: true, message: "Hero Section fetched successfully", data: heroSection });

        return res.status(404).send({ status: false, message: "Hero Section not found" });
    } catch (error) {
        res.status(400).send({ status: false, message: error.message });
    }
};

 
const updateHeroSection = async (req, res) => {
    try {
         
        if (req.files && req.files['images']) {
            req.body.images = req.files['images'].map(file => "uploads/" + file.filename);
        }

       
        if (req.files && req.files['og_image']) {
            req.body.og_image = "uploads/" + req.files['og_image'][0].filename;
        }

        const heroSection = await HeroSection.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (heroSection)
            return res.status(200).send({ status: true, message: "Hero Section updated successfully", data: heroSection });

        return res.status(404).send({ status: false, message: "Hero Section not found" });
    } catch (error) {
        res.status(400).send({ status: false, message: error.message });
    }
};

 
const deleteHeroSection = async (req, res) => {
    try {
        const heroSection = await HeroSection.findByIdAndDelete(req.params.id);
        if (heroSection)
            return res.status(200).send({ status: true, message: "Hero Section deleted successfully", data: heroSection });

        return res.status(404).send({ status: false, message: "Hero Section not found" });
    } catch (error) {
        res.status(400).send({ status: false, message: error.message });
    }
};

module.exports = {
    createHeroSection,
    getHeroSections,
    getHeroSectionById,
    updateHeroSection,
    deleteHeroSection
};
