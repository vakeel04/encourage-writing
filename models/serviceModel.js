const mongoose = require("mongoose")

const serviceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String,},
    heading:{String},
    subHeading:{String},
    specialization: [{
        title:{type:String},
        icon:{type:String},
        description:{type:String},
        startingAt:{type:String},
        turnaround:{type:String},
    }],
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
 
const service = mongoose.model("service", serviceSchema)
module.exports = service;