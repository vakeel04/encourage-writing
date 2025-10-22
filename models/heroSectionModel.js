const mongoose = require("mongoose")

const heroSectionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    subTitle: { type: String, required: true },
    images: { type: Array, required: true },
    status: { type: Boolean, default: true }
}, { timestamps: true })
heroSectionSchema.index({ createdAt: -1 });

const HeroSection = mongoose.model("hero-section", heroSectionSchema)
module.exports = HeroSection 