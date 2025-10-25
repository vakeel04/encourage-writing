const mongoose = require("mongoose")

const achievementSchema = new mongoose.Schema({
    title:{type:String,},
    subTitle:{type:String},
    happy_clients: { type: String},
    happy_serveds: { type: String },
    expert_writers: { type: String},
    status: { type: Boolean, default: true }
}, { timestamps: true })
 
achievementSchema.index({ createdAt: -1 });
const Achievement= mongoose.model("achievement", achievementSchema)
module.exports = Achievement