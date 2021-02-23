const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')


//Booking model
const Booking = require('../../models/Booking')
const Turf = require('../../models/Turf')

// @route GET api/bookings?date=date
// @desc Get all bookings
// @access Public
router.get('/',  (req, res) => {
    const { date } = req.query
    if(!date || date === ''){
        res.status(400).json({ msg: "Please specify date" })
    }
    let today = new Date(date)
    let tomorrow = new Date(today.getTime() + (24 * 60 * 60 * 1000))

    Booking.find({ "timing": {
        "$gte": today, "$lt": tomorrow
    }})
    .then(bookings => {
        res.json({ bookings })
    })
    .catch(err => {
        console.log(err)
    })
})


// @route GET api/bookings/:turfId?date=date
// @desc Get all bookings of a particular turf
// @access Public
router.get('/:turfId',  (req, res) => {

    // Turf.findById(req.params.turfId)
    // .then(turf => {
    //     if(!turf){
    //         return res.status(404).json({ msg: "Turf does not exist" })
    //     }
    // })

    const { date } = req.query
    if(!date || date === ''){
        res.status(400).json({ msg: "Please specify date" })
    }
    let today = new Date(date)
    let tomorrow = new Date(today.getTime() + (24 * 60 * 60 * 1000))

    Booking.find({ 
        "timing": {
        "$gte": today, "$lt": tomorrow
    },
    "turfId": req.params.turfId
    })
    .then(bookings => {
        res.json({ bookings })
    })
    .catch(err => {
        console.log(err)
    })
})


//@route POST api/bookings/:turfId
// @desc Book a turf
// @access Private
router.post('/:turfId', auth, (req, res) => {
    let { timing } = req.body
    timing = new Date(timing)

    //Check if slot is already booked
    Booking.find({
        timing,
        turfId: req.params.turfId
    })
    .then(booking => {

        if(booking.length !== 0){
            return res.status(400).json({ msg: "Slot already booked" })            
        }

        //Create new Booking
        const newBooking = new Booking({
            userId: req.user.id,
            turfId: req.params.turfId,
            timing
        })
    
        newBooking.save()
        .then(booking => {
            res.json({msg: "Booking successfull", booking})
        })
        .catch(err => {
            console.log(err)
        })
    })
    .catch(err => {
        console.log(err)
    })
})


//@route DELETE api/bookings/:turfId/:bookingId
// @desc Cancel a booking
// @access Private

// router.delete('/:turfId/:bookingId',auth, (req, res) => {
    
// } )




module.exports = router