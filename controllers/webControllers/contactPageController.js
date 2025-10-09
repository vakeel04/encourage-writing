const contactPageController = async (req, res) => {
    try {
      res.render("contact", {
        status: true,
        message: "contact page successfully loaded",
        error: req.query.error,
        data: {},
        title: "contact Us",
      });
    } catch (error) {
      res.redired("/error?error=" + error.message);
    }
  };
  module.exports = contactPageController;
  