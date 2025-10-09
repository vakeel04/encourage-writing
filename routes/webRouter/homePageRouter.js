const express = require('express');
const homePageController = require('../../controllers/webControllers/homePageController');
const homeRouter = express.Router()

homeRouter.get('/',homePageController)

module.exports = homeRouter