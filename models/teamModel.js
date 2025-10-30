const mongoose = require("mongoose")

const teamSchema = new mongoose.Schema({
    title: { type: String},
    subTitle: { type: String},
    info:[{ name: { type: String, required: true },
        image: { type: String, },
        desination: { type: String,},
        links: [String],}],
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
teamSchema.index({ createdAt: -1 });

const Team = mongoose.model("team", teamSchema)
module.exports = Team 