const mongoose = require("mongoose")

const VisionMissionSchema = new mongoose.Schema({
    heading: { type: String, required: true },
    subHeading: { type: String, required: true },
    OurVision: { type: String},
    OurMission: {type:String},
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
VisionMissionSchema.index({ createdAt: -1 });

const VisionMission = mongoose.model("VisionMission", VisionMissionSchema)
module.exports = VisionMission