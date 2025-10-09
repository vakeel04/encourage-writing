const express = require('express');
const AboutUsPageController = require('../../controllers/webControllers/aboutUsPageControlle');
const aboutusRouter = express.Router()

aboutusRouter.get('/',AboutUsPageController)

module.exports = aboutusRouter