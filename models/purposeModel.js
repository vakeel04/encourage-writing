const mongoose = require("mongoose")

const purposeSchema = new mongoose.Schema({
    heading:{type:String},
    subHeading:{type:String},
    icon: { type: String, required: true },
    title:{type:String},
    description:{type:String},
    usedBy:{type:String,enum:["about-us","service"]},
    status: { type: Boolean, default: true }
}, { timestamps: true })
 
const Purpose= mongoose.model("purpose", purposeSchema)
module.exports = Purpose