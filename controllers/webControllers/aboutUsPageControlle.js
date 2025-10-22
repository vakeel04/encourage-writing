const AboutUs = require("../../models/aboutUsModel");
const VisionMission = require("../../models/VisionMissionModel");
const Purpose = require("../../models/purposeModel");
const Team = require("../../models/teamModel");
const Bottom = require("../../models/bottomModel");
const Process =require("../../models/processModel")

const AboutUsPageController = async (req, res) => {
  try {

    const [aboutUs,visionMission,purpose,team,bottom,process] = await Promise.all([
      AboutUs.findOne().sort({ createdAt: -1 }),
      VisionMission.findOne().sort({ createdAt: -1 }),
      Purpose.findOne({ usedBy: "about-us" }).sort({ createdAt: -1 }),
      Team.findOne().sort({ createdAt: -1 }),
      Bottom.findOne({ usedBy: "about_us" }).sort({ createdAt: -1 }),
      Process.findOne({ usedBy: "about_us" }).sort({ createdAt: -1 })
      
    ]);
  console.log(process);
  
    console.log("✅ About Us page data loaded successfully");

    res.render("about-us", {
      status: true,
      message: "About page successfully loaded",
      error: req.query.error,
      data: { aboutUs, visionMission, purpose, team, bottom ,process },
      title: "About Us",
    });

  } catch (error) {
    console.error(" About Us page error:", error);
    res.redirect("/error?error=" + error.message);  
  }
};

module.exports = AboutUsPageController;
