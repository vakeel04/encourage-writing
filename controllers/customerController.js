const Customer = require("../models/customerModel.js");

// Create Customer
const createCustomer = async (req, res) => {
    try {
        // Main image required
        if (!req.files || !req.files['image']) {
            return res.status(400).send({ status: false, message: "Customer image is required" });
        }
        req.body.image = "uploads/" + req.files['image'][0].filename;

        // Optional OG image
        if (req.files && req.files['og_image']) {
            req.body.og_image = "uploads/" + req.files['og_image'][0].filename;
        }

        const customer = await Customer.create(req.body);
        return res.status(201).send({ status: true, message: "Customer created successfully", data: customer });

    } catch (error) {
        res.status(400).send({ status: false, message: error.message });
    }
};

// Get All Customers
const getCustomers = async (req, res) => {
    try {
        const customers = await Customer.find().sort({ createdAt: -1 });
        if (customers.length > 0)
            return res.status(200).send({ status: true, message: "Customers fetched successfully", data: customers });

        return res.status(404).send({ status: false, message: "No customers found" });
    } catch (error) {
        res.status(400).send({ status: false, message: error.message });
    }
};

// Get Customer by ID
const getCustomerById = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (customer)
            return res.status(200).send({ status: true, message: "Customer fetched successfully", data: customer });

        return res.status(404).send({ status: false, message: "Customer not found" });
    } catch (error) {
        res.status(400).send({ status: false, message: error.message });
    }
};

// Update Customer
const updateCustomer = async (req, res) => {
    try {
        // Update main image if provided
        if (req.files && req.files['image']) {
            req.body.image = "uploads/" + req.files['image'][0].filename;
        }

        // Update OG image if provided
        if (req.files && req.files['og_image']) {
            req.body.og_image = "uploads/" + req.files['og_image'][0].filename;
        }

        const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (customer)
            return res.status(200).send({ status: true, message: "Customer updated successfully", data: customer });

        return res.status(404).send({ status: false, message: "Customer not found" });
    } catch (error) {
        res.status(400).send({ status: false, message: error.message });
    }
};

// Delete Customer
const deleteCustomer = async (req, res) => {
    try {
        const customer = await Customer.findByIdAndDelete(req.params.id);
        if (customer)
            return res.status(200).send({ status: true, message: "Customer deleted successfully", data: customer });

        return res.status(404).send({ status: false, message: "Customer not found" });
    } catch (error) {
        res.status(400).send({ status: false, message: error.message });
    }
};

module.exports = {
    createCustomer,
    getCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer
};
