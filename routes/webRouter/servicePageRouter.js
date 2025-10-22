const express = require('express');
const {servicePageContoller,serviceDetailPageContoller} = require('../../controllers/webControllers/servicePageController');
const serviceRouter = express.Router()

serviceRouter.get('/',servicePageContoller)
serviceRouter.get('/:id',serviceDetailPageContoller)


module.exports = serviceRouter



