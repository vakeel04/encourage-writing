const VisionMission = require("../models/VisionMissionModel");

 
const createVisionMission = async (req, res) => {
    try {
   
        if (req.files && req.files["og_image"]) {
            req.body.og_image = "uploads/" + req.files["og_image"][0].filename;
        }
        const visionMission = await VisionMission.create(req.body);
        if (visionMission)
            return res.status(201).send({ status: true, message: "Vision & Mission created successfully", data: visionMission });
        return res.status(400).send({ status: false, message: "Failed to create Vision & Mission" });
    } catch (error) {
        res.status(400).send({ status: false, message: error.message });
    }
};

 
const getAllVisionMissions = async (req, res) => {
    try {
        const visionMissions = await VisionMission.find().sort({ createdAt: -1 });
        if (visionMissions.length > 0)
            return res.status(200).send({ status: true, message: "Vision & Missions fetched successfully", data: visionMissions });

        return res.status(404).send({ status: false, message: "No Vision & Mission records found" });
    } catch (error) {
        res.status(400).send({ status: false, message: error.message });
    }
};

 
const getVisionMissionById = async (req, res) => {
    try {
        const visionMission = await VisionMission.findById(req.params.id);
        if (visionMission)
            return res.status(200).send({ status: true, message: "Vision & Mission fetched successfully", data: visionMission });

        return res.status(404).send({ status: false, message: "Vision & Mission not found" });
    } catch (error) {
        res.status(400).send({ status: false, message: error.message });
    }
};

 
const updateVisionMission = async (req, res) => {
    try {
        if (req.files && req.files["og_image"]) {
            req.body.og_image = "uploads/" + req.files["og_image"][0].filename;
        }

        const visionMission = await VisionMission.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (visionMission)
            return res.status(200).send({ status: true, message: "Vision & Mission updated successfully", data: visionMission });

        return res.status(404).send({ status: false, message: "Vision & Mission not found" });
    } catch (error) {
        res.status(400).send({ status: false, message: error.message });
    }
};

 
const deleteVisionMission = async (req, res) => {
    try {
        const visionMission = await VisionMission.findByIdAndDelete(req.params.id);
        if (visionMission)
            return res.status(200).send({ status: true, message: "Vision & Mission deleted successfully", data: visionMission });

        return res.status(404).send({ status: false, message: "Vision & Mission not found" });
    } catch (error) {
        res.status(400).send({ status: false, message: error.message });
    }
};

module.exports = {
    createVisionMission,
    getAllVisionMissions,
    getVisionMissionById,
    updateVisionMission,
    deleteVisionMission
};
