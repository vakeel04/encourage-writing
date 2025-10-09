const Purpose = require("../models/purposeModel.js");

 
const createPurpose = async (req, res) => {
    try {
        const purpose = await Purpose.create(req.body);
        if (purpose)
            return res.status(201).send({ status: true, message: "Purpose created successfully", data: purpose });

        return res.status(400).send({ status: false, message: "Failed to create purpose" });
    } catch (error) {
        res.status(400).send({ status: false, message: error.message });
    }
};

 
const getAllPurpose = async (req, res) => {
    try {
        const purposes = await Purpose.find().sort({ createdAt: -1 });
        if (purposes.length > 0)
            return res.status(200).send({ status: true, message: "Purposes fetched successfully", data: purposes });

        return res.status(404).send({ status: false, message: "No purposes found" });
    } catch (error) {
        res.status(400).send({ status: false, message: error.message });
    }
};

 
const getPurposeById = async (req, res) => {
    try {
        const purpose = await Purpose.findById(req.params.id);
        if (purpose)
            return res.status(200).send({ status: true, message: "Purpose fetched successfully", data: purpose });

        return res.status(404).send({ status: false, message: "Purpose not found" });
    } catch (error) {
        res.status(400).send({ status: false, message: error.message });
    }
};

 
const updatePurpose = async (req, res) => {
    try {
        const purpose = await Purpose.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (purpose)
            return res.status(200).send({ status: true, message: "Purpose updated successfully", data: purpose });

        return res.status(404).send({ status: false, message: "Purpose not found" });
    } catch (error) {
        res.status(400).send({ status: false, message: error.message });
    }
};

 
const deletePurpose = async (req, res) => {
    try {
        const purpose = await Purpose.findByIdAndDelete(req.params.id);
        if (purpose)
            return res.status(200).send({ status: true, message: "Purpose deleted successfully", data: purpose });

        return res.status(404).send({ status: false, message: "Purpose not found" });
    } catch (error) {
        res.status(400).send({ status: false, message: error.message });
    }
};

module.exports = {
    createPurpose,
    getAllPurpose,
    getPurposeById,
    updatePurpose,
    deletePurpose
};
