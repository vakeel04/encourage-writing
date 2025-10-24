const dsBlogPageController = async (req, res) => {
    try {
      res.render("dashboard/ds_manage_blogs", {
        status: true,
        message: "ds-blog page successfully loaded",
        error: req.query.error,
        data: {},
        title: "ds-blog-page",
      });
    } catch (error) {
      res.redired("/error?error=" + error.message);
    }
  };

  module.exports = {dsBlogPageController,};
  