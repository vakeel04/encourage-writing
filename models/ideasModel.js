const mongoose = require("mongoose")

const ideasSchema = new mongoose.Schema({
    heading: { type: String, required: true },
    subHeading: { type: String},
    detail:[{
        title: { type: String, required: true },
        description: { type: String},
        image: { type: String},}
    ],
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
 
const Ideas = mongoose.model("ideas", ideasSchema)
module.exports = Ideas 



