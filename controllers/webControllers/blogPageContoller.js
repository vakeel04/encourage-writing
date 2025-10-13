const Blog = require("../../models/blogModel");
const Top = require("../../models/topModel");
const Bottom = require("../../models/bottomModel");

const blogPageController = async (req, res) => {
  try {
    const top = await Top.findOne({ usedBy: "blog" }).sort({ createdAt: -1 });
    const category = req.query.category;
    let query = {};
    if (category && category !== "All") {
      query.category = category;
    }
    const blogs = await Blog.find(query).sort({ createdAt: -1 });
    const latest = await Blog.find().sort({ createdAt: -1 }).limit(4);
    const popular = await Blog.find({ ispopular: true }).sort({
      createdAt: -1,
    });
    const bottom = await Bottom.findOne({ usedBy: "blog" }).sort({
      createdAt: -1,
    });
    res.render("blogs", {
      status: true,
      message: "blog page successfully loaded",
      error: req.query.error,
      data: { top, blogs, latest, popular, bottom },
      category,
      title: "blog",
    });
  } catch (error) {
    res.redired("/error?error=" + error.message);
  }
};

const blogDetailPageController = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    const latest = await Blog.find().sort({ createdAt: -1 }).limit(4);
    const popular = await Blog.find({ ispopular: true }).sort({
      createdAt: -1,
    });
    const bottom = await Bottom.findOne({ usedBy: "blog_detail" }).sort({
      createdAt: -1,
    });
    res.render("blog", {
      status: true,
      message: "blog details page successfully loaded",
      error: req.query.error,
      data: { blog, popular, latest, bottom },
      title: "blog-details",
    });
  } catch (error) {
    res.redired("/error?error=" + error.message);
  }
};
module.exports = {
  blogPageController,
  blogDetailPageController,
};
