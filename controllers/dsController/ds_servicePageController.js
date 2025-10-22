const dsServicePageController = async (req, res) => {
    try {
      res.render("dashboard/ds_manage_services", {
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

 
  module.exports = {dsServicePageController}
  