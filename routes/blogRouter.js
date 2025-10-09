const express = require("express");
const blogController = require("../controllers/blogController.js");
const upload = require("../services/imgService.js")
const blogRouter = express();

 
blogRouter.post("/",upload.fields([{ name: "image" }, { name: "og_image" }]), blogController.createBlog);
blogRouter.get("/", blogController.getBlogs);
blogRouter.get("/:id", blogController.getBlogById);
blogRouter.put("/:id", upload.fields([{ name: "image" }, { name: "og_image" }]), blogController.updateBlog);
blogRouter.delete("/:id", blogController.deleteBlog);

module.exports = blogRouter;
