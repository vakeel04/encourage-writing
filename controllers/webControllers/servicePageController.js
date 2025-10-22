const Top = require("../../models/topModel");
const Partner = require("../../models/partnerModel");
const ContentPricing = require("../../models/ContentPricingModel");
const Purpose = require("../../models/purposeModel");
const Customer = require("../../models/customerModel");
const Bottom = require("../../models/bottomModel");
const Service = require("../../models/serviceModel");
const Process = require("../../models/processModel");
const FAQ = require("../../models/faqModel");
const ServiceProcess = require("../../models/serviceProcessModel")
const Specialization = require("../../models/specializationModel")



const servicePageContoller = async (req, res) => {
  try {
    const [
      top,
      partner,
      contentPricing,
      purpose,
      customer,
      bottom,service,process
    ] = await Promise.all([
      Top.findOne({ usedBy: "service" }).sort({ createdAt: -1 }),
      Partner.findOne({ usedBy: "service" }).sort({ createdAt: -1 }),
      ContentPricing.findOne({ usedBy: "service" }).sort({ createdAt: -1 }),
      Purpose.findOne({ usedBy: "service" }).sort({ createdAt: -1 }),
      Customer.find({ usedBy: "service" }).sort({ createdAt: -1 }),
      Bottom.findOne({ usedBy: "service" }).sort({ createdAt: -1 }),
      Service.find().sort({ createdAt: -1 }),
      Process.findOne({ usedBy: "service" }).sort({ createdAt: -1 }),
    ]);

    console.log("✅ Service page data loaded successfully");

    res.render("services", {
      status: true,
      message: "Service page successfully loaded",
      error: req.query.error,
      data: { top, partner, contentPricing, purpose, customer, bottom,service ,process},
      title: "Services",
    });

  } catch (error) {
    console.error("❌ Service page error:", error);
    res.redirect("/error?error=" + error.message);
  }
};

 
const serviceDetailPageContoller = async (req, res) => {
  try {
    const {id} = req.params
   const data = await Service.findById(id).sort({ createdAt: -1 })
    const [
    service,contentPricing,process,faq,bottom,serviceProcess,specialization
    ] = await Promise.all([
      Service.findById(id).sort({ createdAt: -1 }),
      ContentPricing.findOne({ usedBy: "service-detail" }).sort({ createdAt: -1 }),
      Process.findOne({ usedBy: "service-detail" }).sort({ createdAt: -1 }),
      FAQ.findOne({ usedBy: "service-detail" }).sort({ createdAt: -1 }),
      Bottom.findOne({ usedBy: "service_detail" }).sort({ createdAt: -1 }),
      ServiceProcess.findOne({ usedBy:data.name }).sort({ createdAt: -1 }),
      Specialization.findOne({ usedBy:data.name }).sort({ createdAt: -1 }),
    ]);
    console.log(specialization)
    res.render("service", {
      status: true,
      message: "Service detail page successfully loaded",
      error: req.query.error,
      data: {service,contentPricing,process,bottom,faq,serviceProcess,specialization},
      title: "Service Details",
    });
  } catch (error) {
    console.error("❌ Service detail page error:", error);
    res.redirect("/error?error=" + error.message);
  }
};

module.exports = {
  servicePageContoller,
  serviceDetailPageContoller
};
