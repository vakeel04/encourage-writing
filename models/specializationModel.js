const mongoose = require("mongoose")

const specializationSchema = new mongoose.Schema({
    heading:{type:String},
    subHeading:{type:String},
    specialization: [{
        title:{type:String},
        icon:{type:String},
        subTitle:{type:String},
        startingAt:{type:String},
        turnaround:{type:String},
        revisions:{type:String},
        format:{type:String},
        rushDelivery:{type:String},
        additionalRevisions:{type:String},
        editorialCalendarCreation:{type:String},
        WordPressPublishing:{type:String},
        includes:{type:Array}
    }],
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
specializationSchema.index({ createdAt: -1 });
 
const Specialization = mongoose.model("specialization", specializationSchema)
module.exports = Specialization;