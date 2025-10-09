const Team = require("../models/teamModel.js");

 
const createTeam = async (req, res) => {
    try {
        const team = await Team.create(req.body);
        if (team)
            return res.status(201).send({ status: true, message: "Team member created successfully", data: team });

        return res.status(400).send({ status: false, message: "Failed to create team member" });
    } catch (error) {
        res.status(400).send({ status: false, message: error.message });
    }
};

 
const getAllTeams = async (req, res) => {
    try {
        const teams = await Team.find().sort({ createdAt: -1 });
        if (teams.length > 0)
            return res.status(200).send({ status: true, message: "Team members fetched successfully", data: teams });

        return res.status(404).send({ status: false, message: "No team members found" });
    } catch (error) {
        res.status(400).send({ status: false, message: error.message });
    }
};

 
const getTeamById = async (req, res) => {
    try {
        const team = await Team.findById(req.params.id);
        if (team)
            return res.status(200).send({ status: true, message: "Team member fetched successfully", data: team });

        return res.status(404).send({ status: false, message: "Team member not found" });
    } catch (error) {
        res.status(400).send({ status: false, message: error.message });
    }
};

 
const updateTeam = async (req, res) => {
    try {
        const team = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (team)
            return res.status(200).send({ status: true, message: "Team member updated successfully", data: team });

        return res.status(404).send({ status: false, message: "Team member not found" });
    } catch (error) {
        res.status(400).send({ status: false, message: error.message });
    }
};

 
const deleteTeam = async (req, res) => {
    try {
        const team = await Team.findByIdAndDelete(req.params.id);
        if (team)
            return res.status(200).send({ status: true, message: "Team member deleted successfully", data: team });

        return res.status(404).send({ status: false, message: "Team member not found" });
    } catch (error) {
        res.status(400).send({ status: false, message: error.message });
    }
};

module.exports = {
    createTeam,
    getAllTeams,
    getTeamById,
    updateTeam,
    deleteTeam
};
