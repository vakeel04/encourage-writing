const HeroSection = require("../models/heroSectionModel.js");
const path = require("path");
const fs = require("fs");

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
      const { removedImages } = req.body;
      const heroId = req.params.id;
  
      // 🟩 Fetch old record
      const oldHero = await HeroSection.findById(heroId);
      if (!oldHero) {
        return res.status(404).send({ status: false, message: "Hero Section not found" });
      }
  
      // 🟩 Handle removed images (delete from uploads)
      let oldImages = oldHero.images || [];
      if (removedImages) {
        const toRemove = JSON.parse(removedImages);
        toRemove.forEach((imgPath) => {
          const fullPath = path.join(process.cwd(), imgPath);
          if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
        });
        oldImages = oldImages.filter((img) => !toRemove.includes(img));
      }
  
      if (req.files && req.files["images"]) {
        const newImages = req.files["images"].map(file => "uploads/" + file.filename);
        oldImages = [...oldImages, ...newImages];
      }
      
  
      // 🟩 Handle OG image (optional)
      if (req.files && req.files["og_image"]) {
        req.body.og_image = "uploads/" + req.files["og_image"][0].filename;
      }
  
      // 🟩 Final data to update
      const updatedData = {
        ...req.body,
        images: oldImages,
      };
  
      const updatedHero = await HeroSection.findByIdAndUpdate(heroId, updatedData, { new: true });
  
      return res.status(200).send({
        status: true,
        message: "Hero Section updated successfully",
        data: updatedHero,
      });
    } catch (error) {
      console.error(error);
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
