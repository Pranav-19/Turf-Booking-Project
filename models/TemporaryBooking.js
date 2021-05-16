const mongoose = require('mongoose')
const Schema = mongoose.Schema


const TemporaryBookingSchema = new Schema({
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

TemporaryBookingSchema.index({ "createdAt": 1 }, { expireAfterSeconds: 60 })

TemporaryBooking = mongoose.model('temporaryBooking', TemporaryBookingSchema)
module.exports = TemporaryBooking