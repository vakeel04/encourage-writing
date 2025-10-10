const mongoose = require("mongoose")

const teamSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    desination: { type: String,},
    links: [{ type: String,}],
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
 
const Team = mongoose.model("team", teamSchema)
module.exports = Team 