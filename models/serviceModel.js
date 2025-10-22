const mongoose = require("mongoose")

const serviceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    title: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String,},
    fastDelivery:{type: String },
    QualityAssured:{type: String },
    expertWriters:{type: String },
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

serviceSchema.index({ createdAt: -1 });
 
const service = mongoose.model("service", serviceSchema)
module.exports = service;