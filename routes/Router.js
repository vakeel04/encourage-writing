const express = require("express")
const aboutUsRouter = require("./aboutUsRouter")
const achievementRouter = require("./achievementRouter")
const blogRouter = require("./blogRouter")
const contactUsRouter = require("./contactUsRouter")
const customerRouter = require("./customerRouter")
const faqRouter = require("./faqRouter")
const heroSectionRouter = require("./heroSectionRouter")
const processRouter = require("./processRouter")
const purposeRouter = require("./purposeRouter")
const serviceRouter = require("./serviceRouter")
const teamRouter = require("./teamRouter")
const userRouter = require("./userRouter")

 
const Router = express()

Router.use("/about-us",aboutUsRouter)
Router.use("/achievement",achievementRouter)
Router.use("/blog",blogRouter)
Router.use("/contact-us",contactUsRouter)
Router.use("/customer",customerRouter)
Router.use("/faq",faqRouter)
Router.use("/hero-section",heroSectionRouter)
Router.use("/process",processRouter)
Router.use("/purpose",purposeRouter)
Router.use("/service",serviceRouter)
Router.use("/team",teamRouter)
Router.use("/user",userRouter)

 
module.exports = Router