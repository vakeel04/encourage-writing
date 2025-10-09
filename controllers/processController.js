const Process = require("../models/processModel.js");

 
const createProcess = async (req, res) => {
    try {
        if (req.files && req.files['og_image']) {
            req.body.og_image = "uploads/" + req.files['og_image'][0].filename;
        }
        const process = await Process.create(req.body);
        if (process)
            return res.status(201).send({ status: true, message: "Process created successfully", data: process });

        return res.status(400).send({ status: false, message: "Failed to create process" });
    } catch (error) {
        res.status(400).send({ status: false, message: error.message });
    }
};

 
const getAllProcess = async (req, res) => {
    try {
        const processes = await Process.find().sort({ createdAt: -1 });
        if (processes.length > 0)
            return res.status(200).send({ status: true, message: "Processes fetched successfully", data: processes });

        return res.status(404).send({ status: false, message: "No processes found" });
    } catch (error) {
        res.status(400).send({ status: false, message: error.message });
    }
};

 
const getProcessById = async (req, res) => {
    try {
        const process = await Process.findById(req.params.id);
        if (process)
            return res.status(200).send({ status: true, message: "Process fetched successfully", data: process });

        return res.status(404).send({ status: false, message: "Process not found" });
    } catch (error) {
        res.status(400).send({ status: false, message: error.message });
    }
};
 
const updateProcess = async (req, res) => {
    try {
        if (req.files && req.files['og_image']) {
            req.body.og_image = "uploads/" + req.files['og_image'][0].filename;
        }

        const process = await Process.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (process)
            return res.status(200).send({ status: true, message: "Process updated successfully", data: process });

        return res.status(404).send({ status: false, message: "Process not found" });
    } catch (error) {
        res.status(400).send({ status: false, message: error.message });
    }
};

 
const deleteProcess = async (req, res) => {
    try {
        const process = await Process.findByIdAndDelete(req.params.id);
        if (process)
            return res.status(200).send({ status: true, message: "Process deleted successfully", data: process });

        return res.status(404).send({ status: false, message: "Process not found" });
    } catch (error) {
        res.status(400).send({ status: false, message: error.message });
    }
};

module.exports = {
    createProcess,
    getAllProcess,
    getProcessById,
    updateProcess,
    deleteProcess
};
