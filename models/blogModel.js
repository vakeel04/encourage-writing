const mongoose = require("mongoose")

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    subTitle: { type: String,},
    image: { type: String, required: true },
    author_name: { type: String,},
    date: { type: String,},
    links: { type: String,},
    description: { type: String,},
    ispopular: { type: String,},
    category: { type: String, enum: ["Education","Content-Writing","Blog-Article"] },
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
blogSchema.index({ createdAt: -1 });
const Blog = mongoose.model("blog", blogSchema)
module.exports = Blog 