const express = require('express');
const contactPageController = require('../../controllers/webControllers/contactPageController');
const contactRouter = express.Router()

contactRouter.get('/',contactPageController)

module.exports = contactRouter