const Customer = require("../../models/customerModel");

const dsCustomerController = async (req, res) => {
  try {
    const data = await Customer.find({});
    res.render("dashboard/ds_manage_customers", {
      status: true,
      message: "Customer management page successfully loaded",
      error: req.query.error || null,
      data: { customers: data }, // You can later pass actual FAQ data here
      title: "Manage Customer",
    });
  } catch (error) {
    res.redirect("/error?error=" + error.message);
  }
};

module.exports = { dsCustomerController };
