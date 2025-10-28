const Blog = require("../../models/blogModel")
const dsBlogPageController = async (req, res) => {
    try {
      const blog = await Blog.find({}).sort({createdAt:-1})
      res.render("dashboard/ds_manage_blogs", {
        status: true,
        message: "ds-blog page successfully loaded",
        error: req.query.error,
        data: {blog},
        title: "ds-blog-page",
      });
    } catch (error) {
      res.redired("/error?error=" + error.message);
    }
  };

  module.exports = {dsBlogPageController,};
  