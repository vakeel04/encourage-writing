const homePageController = async (req, res) => {
    try {
      res.render("index", {
        status: true,
        message: "home page successfully loaded",
        error: req.query.error,
        data: {},
        title: "home",
      });
    } catch (error) {
      res.redired("/error?error=" + error.message);
    }
  };
  module.exports = homePageController;
  