const HeroSection = require("../../models/heroSectionModel")
   const dsHomePageController = async (req, res) => {
      try {
        const heroSection = await HeroSection.find({}).sort({createdAt:-1})
        res.render("dashboard/ds_manage_hero-section", {
          status: true,
          message: "home page successfully loaded",
          error: req.query.error,
          data: {heroSection},
          title: "home-page",
        });
      } catch (error) {
        res.redired("/error?error=" + error.message);
      }
    };
 
    const dsAchievementsController = async (req, res) => {
      try {
        res.render("dashboard/ds_manage_achievements", {
          status: true,
          message: "ds-service page successfully loaded",
          error: req.query.error,
          data: {},
          title: "ds-service-page",
        });
      } catch (error) {
        res.redired("/error?error=" + error.message);
      }
    };

    const dsPartnerController = async (req, res) => {
      try {
        res.render("dashboard/ds_manage_partners", {
          status: true,
          message: "ds-service page successfully loaded",
          error: req.query.error,
          data: {},
          title: "ds-service-page",
        });
      } catch (error) {
        res.redired("/error?error=" + error.message);
      }
    };

    const dsIdeasPageController = async (req, res) => {
      try {
        res.render("dashboard/ds_InsightsIdeas", {
          status: true,
          message: "ds-service page successfully loaded",
          error: req.query.error,
          data: {},
          title: "ds-service-page",
        });
      } catch (error) {
        res.redired("/error?error=" + error.message);
      }
    };

  module.exports = {dsHomePageController,dsAchievementsController,dsPartnerController,dsIdeasPageController };
  