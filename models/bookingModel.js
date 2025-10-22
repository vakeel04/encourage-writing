const mongoose = require("mongoose")

const bookingSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String,},
    phone: { type: Number,},
    address: { type:String,},
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
bookingSchema.index({ createdAt: -1 });
 
const Booking = mongoose.model("booking-service", bookingSchema)
module.exports = Booking 