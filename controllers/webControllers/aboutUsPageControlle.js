const AboutUsPageController = async (req, res) => {
    try {
      res.render("about-us", {
        status: true,
        message: "About page successfully loaded",
        error: req.query.error,
        data: {},
        title: "About Us",
      });
    } catch (error) {
      res.redired("/error?error=" + error.message);
    }
  };
  module.exports = AboutUsPageController;
  