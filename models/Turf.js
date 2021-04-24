const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TurfSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    locality: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phoneNo: {
        type: String,
        required: true
    },
    costPerHour: {
        type: Number,
        required: true
    },
    dateAdded:{
        type:Date,
        default:Date.now
    },
    ownerId: {
        type: String,
        required: true
    },
    isApproved:{
        type: Boolean,
        default: false
    },
    fileURL:{
        type: String
    }
})

module.exports = Turf = mongoose.model('turf', TurfSchema)