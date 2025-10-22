const express = require('express');
const bokingServicePageContorller= require('../../controllers/webControllers/bookingServicePageController');
const bookingRouter = express.Router()

bookingRouter.get('/',bokingServicePageContorller)
 


module.exports = bookingRouter    