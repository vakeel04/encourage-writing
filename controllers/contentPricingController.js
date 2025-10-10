const ContentPricing = require("../models/ContentPricingModel");

 
const createContentPricing = async (req, res) => {
    try {
        const contentPricing = await ContentPricing.create(req.body);
        if (contentPricing)
            return res.status(201).send({ status: true, message: "Content Pricing created successfully", data: contentPricing });

        return res.status(400).send({ status: false, message: "Failed to create content pricing" });
    } catch (error) {
        res.status(400).send({ status: false, message: error.message });
    }
};

 
const getAllContentPricing = async (req, res) => {
    try {
        const contentPricings = await ContentPricing.find().sort({ createdAt: -1 });
        if (contentPricings.length > 0)
            return res.status(200).send({ status: true, message: "Content Pricings fetched successfully", data: contentPricings });

        return res.status(404).send({ status: false, message: "No content pricing records found" });
    } catch (error) {
        res.status(400).send({ status: false, message: error.message });
    }
};

 
const getContentPricingById = async (req, res) => {
    try {
        const contentPricing = await ContentPricing.findById(req.params.id);
        if (contentPricing)
            return res.status(200).send({ status: true, message: "Content Pricing fetched successfully", data: contentPricing });

        return res.status(404).send({ status: false, message: "Content Pricing not found" });
    } catch (error) {
        res.status(400).send({ status: false, message: error.message });
    }
};

 
const updateContentPricing = async (req, res) => {
    try {
        const contentPricing = await ContentPricing.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (contentPricing)
            return res.status(200).send({ status: true, message: "Content Pricing updated successfully", data: contentPricing });

        return res.status(404).send({ status: false, message: "Content Pricing not found" });
    } catch (error) {
        res.status(400).send({ status: false, message: error.message });
    }
};

 
const deleteContentPricing = async (req, res) => {
    try {
        const contentPricing = await ContentPricing.findByIdAndDelete(req.params.id);
        if (contentPricing)
            return res.status(200).send({ status: true, message: "Content Pricing deleted successfully", data: contentPricing });

        return res.status(404).send({ status: false, message: "Content Pricing not found" });
    } catch (error) {
        res.status(400).send({ status: false, message: error.message });
    }
};

module.exports = {
    createContentPricing,
    getAllContentPricing,
    getContentPricingById,
    updateContentPricing,
    deleteContentPricing
};
