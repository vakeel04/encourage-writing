const mongoose = require("mongoose")

const serviceProcessSchema = new mongoose.Schema({
    heading: { type: String, required: true },
    subHeading: { type: String},
    details:[{title: { type: String, required: true },
    description: { type: String},
    icon: { type: String},}],
    bgImg: { type: String},
    usedBy:{type:String,enum:["Blog Writing","Case Study Writing","Ebook Writing","Website Content Writing","SEO Content Writing","Article Writing"],required:true},
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
serviceProcessSchema.index({ createdAt: -1 });
const ServiceProcess = mongoose.model("service-process", serviceProcessSchema)
module.exports = ServiceProcess 


