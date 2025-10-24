const express = require('express');
const {dsBlogPageController} = require("../../controllers/dsController/ds_blogPageController")
const {dsServicePageController, } = require("../../controllers/dsController/ds_servicePageController");
const { dsHomePageController,dsAchievementsController, dsPartnerController, dsIdeasPageController} = require("../../controllers/dsController/ds_HomePageController");
const { dsTeamaPageController, dsVisionMisionPageController } = require('../../controllers/dsController/ds_aboutUsPageController');

 
const dsRouter = express.Router()
dsRouter.get('/',dsHomePageController)
dsRouter.get('/partners',dsPartnerController)
dsRouter.get('/achievements',dsAchievementsController)
dsRouter.get('/ideas',dsIdeasPageController)
dsRouter.get('/service',dsServicePageController)
dsRouter.get('/blog',dsBlogPageController)
dsRouter.get('/team',dsTeamaPageController)
dsRouter.get('/visionMision',dsVisionMisionPageController)



 

module.exports = dsRouter