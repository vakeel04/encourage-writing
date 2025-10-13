const mongoose = require("mongoose")

const partnerSchema = new mongoose.Schema({
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    description: { type: String,},
    images: [{ type: String,}],
    meta_title: { type: String },
    usedBy:{type:String,enum:["home","service"]},
    meta_description: { type: String },
    keywords: { type: String },
    og_title: { type: String },
    og_description: { type: String },
    og_image: { type: String },
    og_url: { type: String },
    og_type: { type: String },
    status: { type: Boolean, default: true }
}, { timestamps: true })
 
const Partner = mongoose.model("partner", partnerSchema)
module.exports = Partner 