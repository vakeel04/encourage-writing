const HeroSection = require("../../models/heroSectionModel");
const ContentPricing = require("../../models/ContentPricingModel");
const Achievement = require("../../models/achievementModel");
const Partner = require("../../models/partnerModel");
const Customer = require("../../models/customerModel");
const Ideas = require("../../models/ideasModel");
const FAQ = require("../../models/faqModel");
const Service = require("../../models/serviceModel");


const homePageController = async (req, res) => {
  try {
    const [heroSection,contentPricing,achievement, partner,customer,ideas,faq,service] = await Promise.all([
      HeroSection.find({}).sort({ createdAt: -1 }),
      ContentPricing.findOne({ usedBy: "home" }).sort({ createdAt: -1 }),
      Achievement.findOne().sort({ createdAt: -1 }),
      Partner.findOne({ usedBy: "home" }).sort({ createdAt: -1 }),
      Customer.find({ usedBy: "home" }).sort({ createdAt: -1 }),
      Ideas.findOne().sort({ createdAt: -1 }),
      FAQ.findOne({ usedBy: "home" }).sort({ createdAt: -1 }),
      Service.find().sort({ createdAt: -1 })

    ]);
    res.render("index", {
      status: true,
      message: "Home page successfully loaded",
      error: req.query.error,
      data: { heroSection, contentPricing, achievement, partner, customer, ideas, faq ,service},
      title: "home",
    });

  } catch (error) {
    console.error("❌ Home page error:", error);
    res.redirect("/error?error=" + error.message);  
  }
};

module.exports = homePageController;
