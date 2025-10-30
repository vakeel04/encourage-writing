const Top = require("../../models/topModel")
const dsTopPageController = async (req, res) => {
    try {
const top  = await Top.find({}).sort({createdAt:-1})
      res.render("dashboard/ds_manage_top", {
        status: true,
        message: "ds_manage_top page successfully loaded",
        error: req.query.error,
        data: {top},
        title: "ds_manage_top-page",
      });
    } catch (error) {
      res.redirect("/error?error=" + error.message);
    }
  };
  module.exports = dsTopPageController
