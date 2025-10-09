const AboutUs = require("../models/aboutUsModel.js");
 

 
const createAboutUs =  async (req, res) => {
    try {
        if (!req.files || !req.files['image']) {
            return res.status(400).send({ status: false, message: "Image file is required" });
        }

        // Main image upload
        req.body.image = "uploads/" + req.files['image'][0].filename;

        // Optional OG image upload
        if (req.files['og_image']) {
            req.body.og_image = "uploads/" + req.files['og_image'][0].filename;
        }

        const aboutUs = await AboutUs.create(req.body);
        if (aboutUs)
            return res.status(201).send({ status: true, message: "About Us created successfully", data: aboutUs });

        return res.status(400).send({ status: false, message: "Failed to create About Us" });
    } catch (error) {
        res.status(400).send({ status: false, message: error.message });
    }
}
 
const getAboutUs = async (req, res) => {
    try {
        const abouts = await AboutUs.find().sort({ createdAt: -1 });
        if (abouts.length > 0)
            return res.status(200).send({ status: true, message: "About Us fetched successfully", data: abouts });

        return res.status(404).send({ status: false, message: "No About Us found" });
    } catch (error) {
        res.status(400).send({ status: false, message: error.message });
    }
}

 
const getAboutUsById = async (req, res) => {
    try {
        const about = await AboutUs.findById(req.params.id);
        if (about)
            return res.status(200).send({ status: true, message: "About Us fetched successfully", data: about });

        return res.status(404).send({ status: false, message: "About Us not found" });
    } catch (error) {
        res.status(400).send({ status: false, message: error.message });
    }
}

 
const updateAboutUs = async (req, res) => {
    try {
        if (req.files && req.files['image']) {
            req.body.image = "uploads/" + req.files['image'][0].filename;
        }
        if (req.files && req.files['og_image']) {
            req.body.og_image = "uploads/" + req.files['og_image'][0].filename;
        }

        const about = await AboutUs.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (about)
            return res.status(200).send({ status: true, message: "About Us updated successfully", data: about });

        return res.status(404).send({ status: false, message: "About Us not found" });
    } catch (error) {
        res.status(400).send({ status: false, message: error.message });
    }
}

 
const deleteAboutUs = async (req, res) => {
    try {
        const about = await AboutUs.findByIdAndDelete(req.params.id);
        if (about)
            return res.status(200).send({ status: true, message: "About Us deleted successfully", data: about });

        return res.status(404).send({ status: false, message: "About Us not found" });
    } catch (error) {
        res.status(400).send({ status: false, message: error.message });
    }
}

module.exports = {
    createAboutUs,
    getAboutUs,
    getAboutUsById,
    updateAboutUs,
    deleteAboutUs
};
