const bokingServicePageContorller = async (req, res) => {
    try {
      res.render("booking-service", {
        status: true,
        message: "booking-service page successfully loaded",
        error: req.query.error,
        data: {},
        title: "booking-service",
      });
    } catch (error) {
      res.redired("/error?error=" + error.message);
    }
  };
  module.exports = bokingServicePageContorller;
  