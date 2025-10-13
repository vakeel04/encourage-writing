const Team = require("../models/teamModel");

const createTeam = async (req, res) => {
  try {
    console.log("Body:", req.body);
    console.log("Files:", req.files);

    // 🧩 Convert multer.any() → fileMap
    const fileMap = {};
    req.files.forEach((file) => {
      if (!fileMap[file.fieldname]) fileMap[file.fieldname] = [];
      fileMap[file.fieldname].push(file);
    });

    // 🧩 Build info array (team members)
    const info = [];

    Object.keys(req.body).forEach((key) => {
      const match = key.match(/^info\[(\d+)\]\.(.+)$/);
      if (match) {
        const index = parseInt(match[1]);
        const field = match[2];
        if (!info[index]) info[index] = {};
        info[index][field] = req.body[key];
      }
    });

    // 🧩 Attach uploaded images
    req.files.forEach((file) => {
      const match = file.fieldname.match(/^info\[(\d+)\]\.image$/);
      if (match) {
        const index = parseInt(match[1]);
        if (!info[index]) info[index] = {};
        info[index].image = "uploads/" + file.filename;
      }
    });
 
// 🧩 Convert member.links → clean array even if sent like: "https://a.com/","https://b.com/"
info.forEach((member) => {
  if (member.links && typeof member.links === "string") {
    member.links = member.links
      .replace(/(^"|"$)/g, "")   // remove starting & ending extra quotes
      .split(",")                // split by comma
      .map((link) => link.replace(/(^"|"$)/g, "").trim()) // clean inner quotes + trim
      .filter((link) => link);   // remove empty links
  } else if (!Array.isArray(member.links)) {
    member.links = [];
  }
});


    // 🧩 OG image (optional)
    if (fileMap["og_image"] && fileMap["og_image"].length > 0) {
      req.body.og_image = "uploads/" + fileMap["og_image"][0].filename;
    }

    // 🧩 Save info array
    if (info.length > 0) {
      req.body.info = info;
    }

    // 🧩 Save to DB
    const team = await Team.create(req.body);

    return res.status(201).json({
      status: true,
      message: "Team created successfully",
      data: team,
    });
  } catch (error) {
    console.error("Create Team Error:", error);
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};


// 🧩 Get All Teams
const getAllTeams = async (req, res) => {
  try {
    const teams = await Team.find().sort({ createdAt: -1 });
    return res.status(200).json({
      status: true,
      message: "Team members fetched successfully",
      data: teams,
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

// 🧩 Get Team By ID
const getTeamById = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team)
      return res
        .status(404)
        .json({ status: false, message: "Team member not found" });

    return res.status(200).json({
      status: true,
      message: "Team member fetched successfully",
      data: team,
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

// 🧩 Update Team
const updateTeam = async (req, res) => {
  try {
    console.log("Body:", req.body);
    console.log("Files:", req.files);

    const fileMap = {};
    req.files.forEach((file) => {
      if (!fileMap[file.fieldname]) fileMap[file.fieldname] = [];
      fileMap[file.fieldname].push(file);
    });

    if (fileMap["image"] && fileMap["image"].length > 0) {
      req.body.image = "uploads/" + fileMap["image"][0].filename;
    }

    if (fileMap["og_image"] && fileMap["og_image"].length > 0) {
      req.body.og_image = "uploads/" + fileMap["og_image"][0].filename;
    }

    if (req.body.links) {
      try {
        req.body.links = JSON.parse(req.body.links);
      } catch {
        req.body.links = [req.body.links];
      }
    }

    const team = await Team.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!team)
      return res
        .status(404)
        .json({ status: false, message: "Team member not found" });

    return res.status(200).json({
      status: true,
      message: "Team member updated successfully",
      data: team,
    });
  } catch (error) {
    console.error("Update Team Error:", error);
    return res.status(500).json({ status: false, message: error.message });
  }
};

// 🧩 Delete Team
const deleteTeam = async (req, res) => {
  try {
    const team = await Team.findByIdAndDelete(req.params.id);
    if (!team)
      return res
        .status(404)
        .json({ status: false, message: "Team member not found" });

    return res.status(200).json({
      status: true,
      message: "Team member deleted successfully",
      data: team,
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

module.exports = {
  createTeam,
  getAllTeams,
  getTeamById,
  updateTeam,
  deleteTeam,
};
