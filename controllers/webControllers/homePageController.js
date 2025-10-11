const HeroSection = require("../../models/heroSectionModel")
const ContentPricing = require("../../models/ContentPricingModel")
const Achievement = require("../../models/achievementModel")
const Partner = require("../../models/partnerModel")
const Customer = require("../../models/customerModel")
const Ideas = require("../../models/ideasModel")
const FAQ = require("../../models/faqModel")





const homePageController = async (req, res) => {
  const heroSection = await HeroSection.find({}).sort({createdAt:-1})
  const contentPricing = await ContentPricing.findOne({usedBy:"home"}).sort({createdAt:-1})
  const achievement = await Achievement.findOne().sort({createdAt:-1})
  const partner = await Partner.findOne().sort({createdAt:-1})
  const customer = await Customer.find().sort({createdAt:-1})
  const ideas = await Ideas.findOne().sort({createdAt:-1})
  const faq = await FAQ.findOne({usedBy:"home"}).sort({createdAt:-1})

console.log(faq);


 
    try {
      res.render("index", {
        status: true,
        message: "home page successfully loaded",
        error: req.query.error,
        data: {heroSection,contentPricing,achievement,partner,customer,ideas,faq},
        title: "home",
      });
    } catch (error) {
      res.redired("/error?error=" + error.message);
    }
  };
  module.exports = homePageController;
  