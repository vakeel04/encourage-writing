const AboutUs = require("../../models/aboutUsModel");
const VisionMission = require("../../models/VisionMissionModel");
const Purpose = require("../../models/purposeModel");



const AboutUsPageController = async (req, res) => {
  const aboutUs = await AboutUs.findOne().sort({createdAt:-1})
  const visionMission = await VisionMission.findOne().sort({createdAt:-1})
  const purpose = await Purpose.findOne({usedBy:"about-us"}).sort({createdAt:-1})

 console.log(purpose);
 
    try {
      res.render("about-us", {
        status: true,
        message: "About page successfully loaded",
        error: req.query.error,
        data: {aboutUs,visionMission,purpose},
        title: "About Us",
      });
    } catch (error) {
      res.redired("/error?error=" + error.message);
    }
  };
  module.exports = AboutUsPageController;
  