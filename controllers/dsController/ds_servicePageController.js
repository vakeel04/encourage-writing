const Service = require("../../models/serviceModel");
const Specialization = require("../../models/specializationModel")
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

  const dsSpecializationsPageController = async (req, res) => {
    try {
      const specialization = await Specialization.find().sort({ createdAt: -1 })
      res.render("dashboard/ds_specializations", {
        status: true,
        message: "ds_specializations page successfully loaded",
        error: req.query.error,
        data: {specialization},
        title: "ds_specializations page",
      });
    } catch (error) {
      res.redired("/error?error=" + error.message);
    }
  };


 
  module.exports = {dsServicePageController,dsSpecializationsPageController}
  