const mongoose = require("mongoose")

const achievementSchema = new mongoose.Schema({
    title:{type:String},
    subTitle:{type:String},
    happy_clients: { type: String, required: true },
    happy_serveds: { type: String, required: true },
    expert_writers: { type: String},
    status: { type: Boolean, default: true }
}, { timestamps: true })
 
const Achievement= mongoose.model("achievement", achievementSchema)
module.exports = Achievement