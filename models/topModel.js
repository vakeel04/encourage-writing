const mongoose = require("mongoose")

const topSchema = new mongoose.Schema({
    heading:{ type: String, required: true },
    subHeading:{ type: String,},
    title: { type: String,},
    subTitle: { type: String,},
    usedBy: { type: String,enum:["service","blog",]},
    image: { type: String},
    bgImg:{ type: String},
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
 
const Top = mongoose.model("top", topSchema)
module.exports = Top 