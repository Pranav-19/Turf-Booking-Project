const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth').auth
const verifyUser = require('../../middleware/auth').verifyUser
const ObjectID = require('mongodb').ObjectID


//Temporary Booking model
const TemporaryBooking = require('../../models/TemporaryBooking')
//User model
const User = require('../../models/User')
//Turf model
const Turf = require('../../models/Turf')
//Booking model
const Booking = require('../../models/Booking')


// // @route GET api/bookings/:turfId?date=date&timing=timing
// // @desc Get all bookings of a particular turf
// // @access Public
// router.get('/:turfId',  (req, res) => {

//     //Check if turf is valid
//     if(!ObjectID.isValid(req.params.turfId)){
//         return res.status(400).json({ msg: "Invalid turf id" })
//     }

//     Turf.findById(req.params.turfId)
//     .then(turf => {
//         //Check if turf is valid
//         if(!turf){
//             return res.status(400).json({ msg: "Invalid turf id" })
//         }
//         let { date, timing } = req.query
//         if(!date || date === ''){
//             date = new Date()
//         }
//         let today = new Date(date)
//         let tomorrow = new Date(today.getTime() + (24 * 60 * 60 * 1000))
    
//         TemporaryBooking.find({ 
//         "timing": timing,
//         "turfId": req.params.turfId
//         })
//         .then(bookings => {
//              if(bookings.length > 0){
//                 return res.status(400).json({ msg: "Slot not available" })
//              }
//             res.json({ msg: "Slot free" })
//         })
//         .catch(err => {
//             console.log(err)
//         })
//     })
// })





//@route POST api/bookings/:turfId
// @desc Book a turf
// @access Private
router.post('/:turfId', auth, (req, res) => {
    console.log(req.body, req.params)

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

        let { timing, userId } = req.body
        timing = new Date(timing)
        console.log(req.body)
    
        //Check if slot is already booked
        Booking.find({
            timing,
            turfId:req.params.turfId
        })
        .then(booking => {
            if(booking.length !== 0){
                return res.status(400).json({ msg: "Slot already booked" })            
            }

            TemporaryBooking.find({
                timing,
                turfId: req.params.turfId
            })
            .then(booking => {
        
                if(booking.length !== 0){
                    return res.status(400).json({ msg: "Slot already booked" })            
                }
        
                //Create new Booking
                const newBooking = new TemporaryBooking({
                    userId: userId,
                    turfId: req.params.turfId,
                    timing,
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
})


//@route DELETE api/bookings/:turfId
// @desc Cancel a booking
// @access Private

router.delete('/:turfId',auth, (req, res) => {
         //Check if turf is valid
         if(!ObjectID.isValid(req.params.turfId)){
            return res.status(400).json({ msg: "Invalid turf id" })
        }
        
        const { timing } = req.body
        TemporaryBooking.findOneAndDelete({
            timing: timing,
            turfId: req.params.turfId
        })
        .then(() => {
            res.json({ msg: "Slot is now free"})
        })
        .catch(err => console.log(err))

} )


module.exports = router