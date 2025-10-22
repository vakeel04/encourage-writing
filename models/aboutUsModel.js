const mongoose = require("mongoose")

const aboutUsSchema = new mongoose.Schema({
    heading: { type: String, required: true },
    subHeading: { type: String, required: true },
    image: { type: String,},
    title: { type: String,},
    description: { type: String,},
    meta_title: { type: String },
    meta_description: { type: String },
    keywords: { type: String },
    og_title: { type: String },
    og_description: { type: String },
    og_image: { type: String },
    og_url: { type: String },
    og_type: { type: String },
    status: { type: Boolean, default: true }
}, { timestamps: true })
aboutUsSchema.index({ createdAt: -1 });
const AboutUs = mongoose.model("about-us", aboutUsSchema)
module.exports = AboutUs 