const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BookingSchema = new Schema({
    userId: {
        type: String, 
        required: true
    },
    turfId: {
        type: String,
        required: true
    },
    timing: {
        type: Date,
        required: true
    },
},{ timestamps: true })

module.exports = Booking = mongoose.model('booking', BookingSchema)