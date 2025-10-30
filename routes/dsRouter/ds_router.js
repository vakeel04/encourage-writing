const express = require("express");
const {dsBlogPageController,} = require("../../controllers/dsController/ds_blogPageController");
const {dsServicePageController,dsSpecializationsPageController,} = require("../../controllers/dsController/ds_servicePageController");
const {dsHomePageController,dsAchievementsController,dsPartnerController,dsIdeasPageController,} = require("../../controllers/dsController/ds_HomePageController");
const {dsTeamaPageController,dsVisionMisionPageController,} = require("../../controllers/dsController/ds_aboutUsPageController");
const {dsFaqController,} = require("../../controllers/dsController/ds_faqsPageController");
const {dsCustomerController,} = require("../../controllers/dsController/ds_customerPageController");
const dsTopPageController = require("../../controllers/dsController/ds_topPageController");
const dsBottomPageController = require("../../controllers/dsController/ds_bottomPageController");

const dsRouter = express.Router();
dsRouter.get("/", dsHomePageController);
dsRouter.get("/partners", dsPartnerController);
dsRouter.get("/achievements", dsAchievementsController);
dsRouter.get("/ideas", dsIdeasPageController);
dsRouter.get("/service", dsServicePageController);
dsRouter.get("/specializations", dsSpecializationsPageController);
dsRouter.get("/blog", dsBlogPageController);
dsRouter.get("/team", dsTeamaPageController);
dsRouter.get("/visionMision", dsVisionMisionPageController);
dsRouter.get("/faqs", dsFaqController);
dsRouter.get("/customers", dsCustomerController);
dsRouter.get("/top", dsTopPageController);
dsRouter.get("/bottom", dsBottomPageController);



module.exports = dsRouter;
