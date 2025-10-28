const Customer = require("../models/customerModel.js");

// Create Customer
const createCustomer = async (req, res) => {
  try {
    // ✅ 1. Check main image
    if (!req.files || !req.files["image"]) {
      return res
        .status(400)
        .send({ status: false, message: "Customer image is required" });
    }

    // ✅ 2. Set image path
    req.body.image = "uploads/" + req.files["image"][0].filename;

    // ✅ 3. Optional OG image
    if (req.files && req.files["og_image"]) {
      req.body.og_image = "uploads/" + req.files["og_image"][0].filename;
    }

    // ✅ 4. Create customer in DB
    const customer = await Customer.create(req.body);

    // ✅ 5. Success response
    return res.status(201).send({
      status: true,
      message: "Customer created successfully",
      data: customer,
    });
  } catch (error) {
    // ❌ Error response
    res.status(400).send({ status: false, message: error.message });
  }
};

// Get All Customers
const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find().sort({ createdAt: -1 });
    if (customers.length > 0)
      return res.status(200).send({
        status: true,
        message: "Customers fetched successfully",
        data: customers,
      });

    return res
      .status(404)
      .send({ status: false, message: "No customers found" });
  } catch (error) {
    res.status(400).send({ status: false, message: error.message });
  }
};

// Get Customer by ID
const getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (customer)
      return res.status(200).send({
        status: true,
        message: "Customer fetched successfully",
        data: customer,
      });

    return res
      .status(404)
      .send({ status: false, message: "Customer not found" });
  } catch (error) {
    res.status(400).send({ status: false, message: error.message });
  }
};

const updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = { ...req.body };

    if (req.files && req.files["image"]) {
      updatedData.image = "uploads/" + req.files["image"][0].filename;
    }

    const customer = await Customer.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!customer)
      return res
        .status(404)
        .json({ status: false, message: "Customer not found" });

    res.json({
      status: true,
      message: "Customer updated successfully",
      data: customer,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};


const deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;

    const customer = await Customer.findById(id);
    if (!customer) {
      return res
        .status(404)
        .json({ status: false, message: "Customer not found" });
    }

    await Customer.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ status: true, message: "Customer deleted successfully" });
  } catch (error) {
    console.error("❌ Delete error:", error);
    return res.status(500).json({ status: false, message: error.message });
  }
};

module.exports = { deleteCustomer };
module.exports = {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
};
