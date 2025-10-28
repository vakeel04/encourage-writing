const Service = require("../../models/serviceModel");
const dsServicePageController = async (req, res) => {
    try {
      const service = await Service.find().sort({ createdAt: -1 })
      res.render("dashboard/ds_manage_services", {
        status: true,
        message: "ds-service page successfully loaded",
        error: req.query.error,
        data: {service},
        title: "ds-service-page",
      });
    } catch (error) {
      res.redired("/error?error=" + error.message);
    }
  };

 
  module.exports = {dsServicePageController}
  