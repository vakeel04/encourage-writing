const express = require('express');
const homeRouter = require('./homePageRouter');
const aboutusRouter = require('./aboutUsPageRouter');
const serviceRouter = require('./servicePageRouter');
const blogRouter = require('./blogPageRouter');
const contactRouter = require('./contactPageRouter');
const bookingRouter = require('./bookingServicePageRouter');

const indexRouter = express.Router()



indexRouter.use('/',homeRouter)
indexRouter.use('/about-us',aboutusRouter)
indexRouter.use('/service',serviceRouter)
indexRouter.use('/blog',blogRouter)
indexRouter.use('/contact',contactRouter)
indexRouter.use('/booking-service',bookingRouter)

 

module.exports = indexRouter