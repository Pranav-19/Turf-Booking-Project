const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const ObjectID = require('mongodb').ObjectID


//Booking model
const Booking = require('../../models/Booking')
//User model
const User = require('../../models/User')
//Turf model
const Turf = require('../../models/Turf')

// @route GET api/bookings?date=date
// @desc Get all bookings
// @access Public
router.get('/',  (req, res) => {
    let { date } = req.query
    if(!date || date === ''){
        date = new Date()
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

    //Check if turf is valid
    if(!ObjectID.isValid(req.params.turfId)){
        return res.status(400).json({ msg: "Invalid turf id" })
    }

    Turf.findById(req.params.turfId)
    .then(turf => {
        //Check if turf is valid
        if(!turf){
            return res.status(400).json({ msg: "Invalid turf id" })
        }
        let { date } = req.query
        if(!date || date === ''){
            date = new Date()
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
})



// @route GET api/bookings/users/:userId
// @desc Get all bookings of a user
// @access Public
router.get('/users/:userId',  (req, res) => {

    //Check if user is valid
    if(!ObjectID.isValid(req.params.userId)){
        return res.status(400).json({ msg: "Invalid user id" })
    }

    User.findById(req.params.userId)
    .then(user => {
        //Check if user is valid
        if(!user){
            return res.status(400).json({ msg: "Invalid user id" })
        }
        Booking.find({
            userId: req.params.userId
        })
        .then(bookings => {
            res.json({ bookings })
        })
        .catch(err => {
            console.log(err)
        })
    })
    .catch(err => {
        console.log(err)
    })

})



//@route POST api/bookings/:turfId
// @desc Book a turf
// @access Private
router.post('/:turfId', auth, (req, res) => {

    //Check if turf is valid
    if(!ObjectID.isValid(req.params.turfId)){
        return res.status(400).json({ msg: "Invalid turf id" })
    }

    Turf.findById(req.params.turfId)
    .then(turf => {
         //Check if turf is valid
        if(!turf){
            return res.status(400).json({ msg: "Invalid turf id" })
        }

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
})


//@route DELETE api/bookings/:turfId/:bookingId
// @desc Cancel a booking
// @access Private

// router.delete('/:turfId/:bookingId',auth, (req, res) => {
    
// } )


module.exports = router