const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth').auth
const verifyUser = require('../../middleware/auth').verifyUser
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
        console.log(err.response)
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
// @access Private
router.get('/users/:userId', verifyUser,  (req, res) => {


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
        .sort({ timing: -1 })
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
    .then(turfFound => {
         //Check if turf is valid
        if(!turfFound){
            return res.status(400).json({ msg: "Invalid turf id" })
        }

        let { timing, turf, user } = req.body
        timing = new Date(timing)
        console.log(req.body)
    
        //Check if slot is already booked
        Booking.find({
            timing,
            turf,
            turfId: req.params.turfId,
        })
        .then(booking => {
    
            if(booking.length !== 0){
                return res.status(400).json({ msg: "Slot already booked" })            
            }
    
            //Create new Booking
            const newBooking = new Booking({
                userId: req.user.id,
                turfId: req.params.turfId,
                timing,
                turf,
                user
            })
        
            newBooking.save()
            .then(booking => {
                res.json({msg: "Booking successful", booking})
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

router.delete('/:turfId/:bookingId',auth, (req, res) => {
         //Check if turf is valid
         if(!ObjectID.isValid(req.params.turfId)){
            return res.status(400).json({ msg: "Invalid turf id" })
        }
         //Check if booking is valid
         if(!ObjectID.isValid(req.params.bookingId)){
            return res.status(400).json({ msg: "Invalid booking id" })
        }

        Booking.findById(req.params.bookingId)
        .then(booking => {
            if(!booking){
                return res.status(400).json({ msg: "Invalid booking id" })
            }

            let date = new Date()

            if(req.user.id !== booking.user._id){
                return res.status(401).json({ msg: "Not authorised" })
            }

            Booking.findByIdAndDelete(booking._id)
            .then(() => res.json({ success: true }))
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))

} )


module.exports = router