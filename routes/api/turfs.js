const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const { canAddTurf } = require('../../permissions/turf')

//Turf model
const Turf = require('../../models/Turf')

// @route GET api/turfs
// @desc Get all turfs
// @access Public
router.get('/', (req, res) => {
    Turf.find()
    .sort({ dateAdded: -1 })
    .then(turfs => {
        res.json(turfs)
    })
})

// @route POST api/turfs
// @desc Add a new turf
// @access Private
router.post('/',auth,verifyBusinessUser, (req, res) => {
    const { name, address, phoneNo, costPerHour } = req.body

    if(!name || !address || !phoneNo || !costPerHour){
        res.status(400).json({ msg: "Please enter all fields" })
    }

    const newTurf = new Turf({
        name,
        address,
        phoneNo,
        costPerHour,
        ownerId: req.user.id
    })

    newTurf.save()
    .then(turf => {
        res.json(turf)
    })
})




function verifyBusinessUser(req, res, next){
    if(!canAddTurf(req.user)){
        return res.status(401).json({msg: "Cannot add Turf, not a business user"})
    }
    next()
}

module.exports = router