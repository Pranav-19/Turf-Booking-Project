const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TurfSchema = new Schema({
    name: {
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
    }
})

module.exports = Turf = mongoose.model('turf', TurfSchema)