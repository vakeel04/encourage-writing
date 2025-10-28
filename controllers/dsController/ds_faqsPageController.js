const FAQ = require("../../models/faqModel");

const dsFaqController = async (req, res) => {
  try {
    const data = await FAQ.find({});
    console.log(data);

    res.render("dashboard/ds_manage_faqs", {
      currentPage: "faqs",
      status: true,
      message: "FAQ management page successfully loaded",
      error: req.query.error || null,
      data: { faq: data }, // You can later pass actual FAQ data here
      title: "Manage FAQs",
    });
  } catch (error) {
    res.redirect("/error?error=" + error.message);
  }
};

module.exports = { dsFaqController };
