const Bottom = require("../../models/bottomModel");
const dsBottomPageController = async (req, res) => {
  try {
    const bottom = await Bottom.find({}).sort({ createdAt: -1 });
    res.render("dashboard/ds_manage_bottom", {
      status: true,
      message: "ds_manage_top page successfully loaded",
      error: req.query.error,
      data: { bottom },
      title: "ds_manage_top-page",
    });
  } catch (error) {
    res.redirect("/error?error=" + error.message);
  }
};
module.exports = dsBottomPageController;
