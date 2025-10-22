const mongoose = require("mongoose")

const bottomSchema = new mongoose.Schema({
    title: { type: String, required: true },
    subTitle: { type: String, required: true },
    usedBy: { type: String,enum:["about_us","blog","blog_detail","service","service_detail"]},
    image: { type: String},
    detail: [{type:String}],
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
bottomSchema.index({ createdAt: -1 });
const Bottom = mongoose.model("bottom", bottomSchema)
module.exports = Bottom 