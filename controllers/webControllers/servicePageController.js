const Top = require("../../models/topModel")
const Partner = require("../../models/partnerModel")
const ContentPricing = require("../../models/ContentPricingModel")

const servicePageContoller = async (req, res) => {
    try {
      const top = await Top.findOne({usedBy:"service"}).sort({createdAt:-1})
      const partner = await Partner.findOne({usedBy:"service"}).sort({createdAt:-1})
      const contentPricing = await ContentPricing.findOne({usedBy:"service"}).sort({createdAt:-1})

      console.log(contentPricing);
      
      res.render("services", {
        status: true,
        message: "sevice page successfully loaded",
        error: req.query.error,
        data: {top,partner,contentPricing},
        title: "services",
      });
    } catch (error) {
      res.redired("/error?error=" + error.message);
    }
  };

  const serviceDetailPageContoller = async (req, res) => {
    try {
      res.render("service", {
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
  