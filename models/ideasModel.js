const mongoose = require("mongoose")

const ideasSchema = new mongoose.Schema({
    title: { type: String, required: true },
    subTitle: { type: String},
    detail:[{
        title: { type: String, required: true },
        description: { type: String},
        image: { type: String},
        date: { type: String},
      }
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
 
const Ideas = mongoose.models.ideas || mongoose.model("ideas", ideasSchema)
module.exports = Ideas 



