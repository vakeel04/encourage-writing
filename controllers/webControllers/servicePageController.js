const servicePageContoller = async (req, res) => {
    try {
      res.render("services", {
        status: true,
        message: "sevice page successfully loaded",
        error: req.query.error,
        data: {},
        title: "services",
      });
    } catch (error) {
      res.redired("/error?error=" + error.message);
    }
  };
  const serviceDetailPageContoller = async (req, res) => {
    try {
      res.render("service-details", {
        status: true,
        message: "sevice-detail page successfully loaded",
        error: req.query.error,
        data: {},
        title: "service-details",
      });
    } catch (error) {
      res.redired("/error?error=" + error.message);
    }
  };
  module.exports = {
    servicePageContoller,
    serviceDetailPageContoller
  }
  