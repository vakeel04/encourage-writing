const express = require('express');
const {dsBlogPageController} = require("../../controllers/dsController/ds_blogPageController")
const {dsServicePageController, } = require("../../controllers/dsController/ds_servicePageController");
const { dsHomePageController,dsAchievementsController} = require("../../controllers/dsController/ds_HomePageController")

 
const dsRouter = express.Router()
dsRouter.get('/',dsHomePageController)
dsRouter.get('/achievements',dsAchievementsController)

dsRouter.get('/service',dsServicePageController)
dsRouter.get('/blog',dsBlogPageController)

 

module.exports = dsRouter