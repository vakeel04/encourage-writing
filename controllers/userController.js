const User = require("../models/userModel.js");

// 🟢 Create user
const createUser = async (req, res) => {
    try {
        const { email } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ status: false, message: "User already exists" });
        }

        // Create user
        const user = await User.create(req.body);

        // Generate JWT token
        const token = user.getSignedJwtToken();
        user.token = token;

        await user.save();

        return res.status(201).send({
            status: true,
            message: "User created successfully",
            data: user
        });

    } catch (error) {
        console.error("Create User Error:", error);
        res.status(400).send({ status: false, message: error.message });
    }
};

// 🟡 Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().sort({ createdAt: -1 });
        if (users.length > 0) {
            return res.status(200).send({ status: true, message: "Users fetched successfully", data: users });
        }
        return res.status(404).send({ status: false, message: "No users found" });
    } catch (error) {
        res.status(400).send({ status: false, message: error.message });
    }
};

// 🔵 Get user by ID
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            return res.status(200).send({ status: true, message: "User fetched successfully", data: user });
        }
        return res.status(404).send({ status: false, message: "User not found" });
    } catch (error) {
        res.status(400).send({ status: false, message: error.message });
    }
};

// 🟠 Update user
const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (user) {
            return res.status(200).send({ status: true, message: "User updated successfully", data: user });
        }
        return res.status(404).send({ status: false, message: "User not found" });
    } catch (error) {
        res.status(400).send({ status: false, message: error.message });
    }
};

// 🔴 Delete user
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (user) {
            return res.status(200).send({ status: true, message: "User deleted successfully", data: user });
        }
        return res.status(404).send({ status: false, message: "User not found" });
    } catch (error) {
        res.status(400).send({ status: false, message: error.message });
    }
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};
