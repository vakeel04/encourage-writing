const Blog = require("../models/blogModel.js");

// Create Blog
const createBlog = async (req, res) => {
  try {
    // Main image upload
    if (!req.files || !req.files['image']) {
      return res.status(400).send({ status: false, message: "Main image is required" });
    }
    req.body.image = "uploads/" + req.files['image'][0].filename;

    // Optional OG image upload
    if (req.files['og_image']) {
      req.body.og_image = "uploads/" + req.files['og_image'][0].filename;
    }

    const blog = await Blog.create(req.body);
    if (blog)
      return res.status(201).send({ status: true, message: "Blog created successfully", data: blog });

    return res.status(400).send({ status: false, message: "Failed to create Blog" });
  } catch (error) {
    res.status(400).send({ status: false, message: error.message });
  }
};

// Get all blogs
const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    if (blogs.length > 0)
      return res.status(200).send({ status: true, message: "Blogs fetched successfully", data: blogs });

    return res.status(404).send({ status: false, message: "No Blogs found" });
  } catch (error) {
    res.status(400).send({ status: false, message: error.message });
  }
};

// Get blog by ID
const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (blog)
      return res.status(200).send({ status: true, message: "Blog fetched successfully", data: blog });

    return res.status(404).send({ status: false, message: "Blog not found" });
  } catch (error) {
    res.status(400).send({ status: false, message: error.message });
  }
};

// Update blog
const updateBlog = async (req, res) => {
  try {
    // Update images if new ones provided
    if (req.files && req.files['image']) {
      req.body.image = "uploads/" + req.files['image'][0].filename;
    }
    if (req.files && req.files['og_image']) {
      req.body.og_image = "uploads/" + req.files['og_image'][0].filename;
    }

    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (blog)
      return res.status(200).send({ status: true, message: "Blog updated successfully", data: blog });

    return res.status(404).send({ status: false, message: "Blog not found" });
  } catch (error) {
    res.status(400).send({ status: false, message: error.message });
  }
};

// Delete blog
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (blog)
      return res.status(200).send({ status: true, message: "Blog deleted successfully", data: blog });

    return res.status(404).send({ status: false, message: "Blog not found" });
  } catch (error) {
    res.status(400).send({ status: false, message: error.message });
  }
};

module.exports = {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog
};
