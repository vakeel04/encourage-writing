const dsVisionMisionPageController = async (req, res) => {
    try {
      res.render("dashboard/ds_visionMission", {
        status: true,
        message: "ds-about-us page successfully loaded",
        error: req.query.error,
        data: {},
        title: "ds-about-us page",
      });
    } catch (error) {
      res.redired("/error?error=" + error.message);
    }
  };


  const dsTeamaPageController = async (req, res) => {
    try {
      res.render("dashboard/ds_manage_team", {
        status: true,
        message: "ds-about-us page successfully loaded",
        error: req.query.error,
        data: {},
        title: "ds-about-us page",
      });
    } catch (error) {
      res.redired("/error?error=" + error.message);
    }
  };

 
  module.exports = {dsVisionMisionPageController,dsTeamaPageController}
  