const mongoose = require("mongoose")

const contactUsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: Number,},
    service_type: { type: String,enum:["Digital Marketing","UI/UX Design","Web Development"]},
    message: { type:String,},
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
 
const ContactUs = mongoose.model("contact-us", contactUsSchema)
module.exports = ContactUs 