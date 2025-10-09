const mongoose = require("mongoose")

const faqSchema = new mongoose.Schema({
    page: { type: String, required: true },
    title: { type: String, required: true },
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
 
const FAQ = mongoose.model("faq", faqSchema)
module.exports = FAQ 