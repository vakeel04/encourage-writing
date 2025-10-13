const AboutUs = require("../../models/aboutUsModel");
const VisionMission = require("../../models/VisionMissionModel");
const Purpose = require("../../models/purposeModel");
const Team =require("../../models/teamModel")
const Bottom =require("../../models/bottomModel")




const AboutUsPageController = async (req, res) => {
    try {
      const aboutUs = await AboutUs.findOne().sort({createdAt:-1})
      const visionMission = await VisionMission.findOne().sort({createdAt:-1})
      const purpose = await Purpose.findOne({usedBy:"about-us"}).sort({createdAt:-1})
      const team = await Team.findOne().sort({createdAt:-1})
      const bottom = await Bottom.findOne({usedBy:"about_us"}).sort({createdAt:-1})
      res.render("about-us", {
        status: true,
        message: "About page successfully loaded",
        error: req.query.error,
        data: {aboutUs,visionMission,purpose,team,bottom},
        title: "About Us",
      });
    } catch (error) {
      res.redired("/error?error=" + error.message);
    }
  };
  module.exports = AboutUsPageController;
  