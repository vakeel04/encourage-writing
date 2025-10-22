const mongoose = require("mongoose")

const purposeSchema = new mongoose.Schema({
    heading:{type:String},
    subHeading:{type:String},
    details:[{title: { type: String, required: true },
        description: { type: String},
        icon: { type: String},}],
    usedBy:{type:String,enum:["about-us","service"]},
    projectsDelivered:{type:String},
    wordsWritten:{type:String},
    avgTrafficGrowth:{type:String},
    status: { type: Boolean, default: true }
}, { timestamps: true })
purposeSchema.index({ createdAt: -1 });
const Purpose= mongoose.model("purpose", purposeSchema)
module.exports = Purpose