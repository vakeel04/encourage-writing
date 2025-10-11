
const Service = require("../models/serviceModel.js");

// Create Service
const createService = async (req, res) => {
    try {
        console.log("Body:", req.body);
        console.log("Files:", req.files);

        // 🧩 Convert multer.any() file array → fieldname map
        const fileMap = {};
        req.files.forEach((file) => {
            if (!fileMap[file.fieldname]) fileMap[file.fieldname] = [];
            fileMap[file.fieldname].push(file);
        });

        // 🧩 Validate: main image required
        if (!fileMap["image"] || fileMap["image"].length === 0) {
            return res.status(400).json({
                status: false,
                message: "Main image is required",
            });
        }

        // 🧩 Assign main image
        req.body.image = "uploads/" + fileMap["image"][0].filename;

        // 🧩 OG image (optional)
        if (fileMap["og_image"] && fileMap["og_image"].length > 0) {
            req.body.og_image = "uploads/" + fileMap["og_image"][0].filename;
        }

        // 🧩 Build specialization array
        const specializations = [];

        // Collect specialization fields
        Object.keys(req.body).forEach((key) => {
            const match = key.match(/^specialization\[(\d+)\]\.(.+)$/);
            if (match) {
                const index = parseInt(match[1]);
                const field = match[2];
                if (!specializations[index]) specializations[index] = {};
                specializations[index][field] = req.body[key];
            }
        });

        // Attach specialization icons
        req.files.forEach((file) => {
            const match = file.fieldname.match(/^specialization\[(\d+)\]\.icon$/);
            if (match) {
                const index = parseInt(match[1]);
                if (!specializations[index]) specializations[index] = {};
                specializations[index].icon = "uploads/" + file.filename;
            }
        });

        if (specializations.length > 0) {
            req.body.specialization = specializations;
        }

        // 🧩 Save in database
        const newService = await Service.create(req.body);

        return res.status(201).json({
            status: true,
            message: "Service created successfully",
            data: newService,
        });
    } catch (error) {
        console.error("Create Service Error:", error);
        return res.status(500).json({ status: false, message: error.message });
    }
};

// Get All Services
const getAllServices = async (req, res) => {
    try {
        const services = await Service.find().sort({ createdAt: -1 });
        if (services.length > 0)
            return res.status(200).send({ status: true, message: "Services fetched successfully", data: services });

        return res.status(404).send({ status: false, message: "No services found" });
    } catch (error) {
        res.status(400).send({ status: false, message: error.message });
    }
};

// Get Service by ID
const getServiceById = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (service)
            return res.status(200).send({ status: true, message: "Service fetched successfully", data: service });

        return res.status(404).send({ status: false, message: "Service not found" });
    } catch (error) {
        res.status(400).send({ status: false, message: error.message });
    }
};

// Update Service
const updateService = async (req, res) => {
    try {
        // Update main image if new one provided
        if (req.files && req.files['image']) {
            req.body.image = "uploads/" + req.files['image'][0].filename;
        }

        // Update OG image
        if (req.files && req.files['og_image']) {
            req.body.og_image = "uploads/" + req.files['og_image'][0].filename;
        }

        // Update specialization icons
        if (req.body.specialization && req.files && req.files['specialization_icons']) {
            req.body.specialization = req.body.specialization.map((item, index) => {
                if (req.files['specialization_icons'][index]) {
                    item.icon = "uploads/" + req.files['specialization_icons'][index].filename;
                }
                return item;
            });
        }

        const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (service)
            return res.status(200).send({ status: true, message: "Service updated successfully", data: service });

        return res.status(404).send({ status: false, message: "Service not found" });
    } catch (error) {
        res.status(400).send({ status: false, message: error.message });
    }
};

// Delete Service
const deleteService = async (req, res) => {
    try {
        const service = await Service.findByIdAndDelete(req.params.id);
        if (service)
            return res.status(200).send({ status: true, message: "Service deleted successfully", data: service });

        return res.status(404).send({ status: false, message: "Service not found" });
    } catch (error) {
        res.status(400).send({ status: false, message: error.message });
    }
};

module.exports = {
    createService,
    getAllServices,
    getServiceById,
    updateService,
    deleteService
};
