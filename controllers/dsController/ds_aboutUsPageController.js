
 const VisionMission  = require('../../models/VisionMissionModel')
 const Team  = require('../../models/teamModel')

 const dsVisionMisionPageController = async (req, res) => {
    try {
      const visionMission = await VisionMission.find({}).sort({createdAt:-1})
      res.render("dashboard/ds_visionMission", {
        status: true,
        message: "ds-about-us page successfully loaded",
        error: req.query.error,
        data: {visionMission},
        title: "ds-about-us page",
      });
    } catch (error) {
      res.redired("/error?error=" + error.message);
    }
  };


  const dsTeamaPageController = async (req, res) => {
    try {
      const team = await Team.find({}).sort({createdAt:-1})
      res.render("dashboard/ds_manage_team", {
        status: true,
        message: "ds-about-us page successfully loaded",
        error: req.query.error,
        data: {team},
        title: "ds-about-us page",
      });
    } catch (error) {
      res.redired("/error?error=" + error.message);
    }
  };

 
  module.exports = {dsVisionMisionPageController,dsTeamaPageController}
  