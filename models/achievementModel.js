const mongoose = require("mongoose")

const achievementSchema = new mongoose.Schema({
    title:{type:String},
    subTitle:{type:String},
    happy_clients: { type: Number, required: true },
    happy_serveds: { type: Number, required: true },
    expert_writers: { type: Number},
    icons: [{type:String}],

    status: { type: Boolean, default: true }
}, { timestamps: true })
 
const Achievement= mongoose.model("achievement", achievementSchema)
module.exports = Achievement