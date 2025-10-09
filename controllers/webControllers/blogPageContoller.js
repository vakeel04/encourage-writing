const blogPageController = async (req, res) => {
    try {
      res.render("blogs", {
        status: true,
        message: "blog page successfully loaded",
        error: req.query.error,
        data: {},
        title: "blog",
      });
    } catch (error) {
      res.redired("/error?error=" + error.message);
    }
  };
  const blogDetailPageController = async (req, res) => {
    try {
      res.render("blog-details", {
        status: true,
        message: "blog details page successfully loaded",
        error: req.query.error,
        data: {},
        title: "blog-details",
      });
    } catch (error) {
      res.redired("/error?error=" + error.message);
    }
  };
  module.exports = {
    blogPageController,
    blogDetailPageController
  }
  