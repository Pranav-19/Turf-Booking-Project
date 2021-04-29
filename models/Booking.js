const mongoose = require('mongoose')
const Schema = mongoose.Schema
const TurfSchema = require('./Turf').schema
const UserSchema = require('./User').schema

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
    turf: {
        type: TurfSchema,
        required: true
    },
    user: {
        type: Object
    },
},{ timestamps: true })

module.exports = Booking = mongoose.model('booking', BookingSchema)