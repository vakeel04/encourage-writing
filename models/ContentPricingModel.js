const mongoose = require("mongoose")

const contentPricingSchema = new mongoose.Schema({
    heading: { type: String, required: true },
    subHeading: { type: String, required: true },
    title: { type: String,},
    detail: [{ type: String,}],
    usedBy: {type:String,enum:["home","service","service-detail"]},
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
 
const ContentPricing = mongoose.model("contentPricing", contentPricingSchema)
module.exports = ContentPricing 