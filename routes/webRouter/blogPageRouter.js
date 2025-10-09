const express = require('express');
const {blogPageController,blogDetailPageController} = require('../../controllers/webControllers/blogPageContoller');
const blogRouter = express.Router()

blogRouter.get('/',blogPageController)
blogRouter.get('/:id',blogDetailPageController)


module.exports = blogRouter