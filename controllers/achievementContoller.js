const Achievement = require("../models/achievementModel.js");

 
const createAchievement = async (req, res) => {
    try {
        const achievement = await Achievement.create(req.body);
        console.log("req---->",req.body);
        
        if (achievement)
         return res.status(201).send({ status: true, message: "Achievement created successfully", data: achievement });
        return res.status(400).send({ status: false, message: "Failed to create Achievement" });
    } catch (error) {
        res.status(400).send({ status: false, message: error.message });
    }
};

 
const getAchievements = async (req, res) => {
    try {
        const achievements = await Achievement.find().sort({ createdAt: -1 });
        if (achievements.length > 0)
            return res.status(200).send({ status: true, message: "Achievements fetched successfully", data: achievements });
        return res.status(404).send({ status: false, message: "No Achievements found" });
    } catch (error) {
        res.status(400).send({ status: false, message: error.message });
    }
};

 
const getAchievementById = async (req, res) => {
    try {
        const achievement = await Achievement.findById(req.params.id);
        if (achievement)
            return res.status(200).send({ status: true, message: "Achievement fetched successfully", data: achievement });

        return res.status(404).send({ status: false, message: "Achievement not found" });
    } catch (error) {
        res.status(400).send({ status: false, message: error.message });
    }
};

 
const updateAchievement = async (req, res) => {
    try {
        const achievement = await Achievement.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (achievement)
            return res.status(200).send({ status: true, message: "Achievement updated successfully", data: achievement });

        return res.status(404).send({ status: false, message: "Achievement not found" });
    } catch (error) {
        res.status(400).send({ status: false, message: error.message });
    }
};

 
const deleteAchievement = async (req, res) => {
    try {
        const achievement = await Achievement.findByIdAndDelete(req.params.id);
        if (achievement)
            return res.status(200).send({ status: true, message: "Achievement deleted successfully", data: achievement });

        return res.status(404).send({ status: false, message: "Achievement not found" });
    } catch (error) {
        res.status(400).send({ status: false, message: error.message });
    }
};

module.exports = {
    createAchievement,
    getAchievements,
    getAchievementById,
    updateAchievement,
    deleteAchievement
};
