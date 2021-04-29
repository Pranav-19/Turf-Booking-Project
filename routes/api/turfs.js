const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth').auth
const { canAddTurf } = require('../../permissions/turf')
const ObjectID = require('mongodb').ObjectID


//Turf model
const Turf = require('../../models/Turf')
//Booking model
const Booking = require('../../models/Booking')

// @route GET api/turfs
// @desc Get all turfs
// @access Public
router.get('/', (req, res) => {
    Turf.find({})
    .sort({ dateAdded: -1 })
    .then(turfs => {
        res.json(turfs)
    })
})


// @route GET api/turfs/approved
// @desc Get approved turfs
// @access Public
router.get('/approved', (req, res) => {
    Turf.find({
        isApproved: true
    })
    .sort({ dateAdded: -1 })
    .limit(9)
    .then(turfs => {
        res.json(turfs)
    })
})
// @route GET api/turfs/forApproval
// @desc Get list of turfs not approved (For admin)
// @access Private
router.get('/forApproval',auth, verifyAdminUser,(req, res) => {
    Turf.find({
        isApproved: false
    })
    .then(turfs => {
        res.json(turfs)
    })
})


// @route GET api/turfs/search?searchText=searchText
// @desc Get searched Turfs
// @access Public

router.get('/search', (req, res) => {
    let { searchText } = req.query

    if(!searchText){
        Turf.find({
            isApproved: true
        })
        .then(turfs => {
            res.json(turfs)
        })
    }
    Turf.find({
        $text:{
            $search: searchText
        },
        isApproved: true
    })
    .then(turfs => {
        res.json(turfs)
    })
})

// @route GET api/turfs/myTurfs
// @desc Get my turfs
// @access Private
router.get('/myTurfs',auth,verifyBusinessUser,(req, res) => {
    Turf.find({
        ownerId: req.user.id
    })
    .sort({ dateAdded: -1 })
    .then(turfs => {
        res.json(turfs)
    })
})



// @route GET api/turfs/:turfId
// @desc Get a turf
// @access Public
router.get('/:turfId', (req, res) => {
     //Check if turf is valid
     if(!ObjectID.isValid(req.params.turfId)){
        return res.status(400).json({ msg: "Invalid turf id" })
    }

    Turf.findById(req.params.turfId)
    .then(turf => {
        if(!turf){
            return res.status(400).json({ msg: "Invalid turf id" })
        }
        res.json(turf)
    }).catch(err => {
        console.log(err)
    })

})






// @route POST api/turfs
// @desc Add a new turf
// @access Private
router.post('/',auth,verifyBusinessUser, (req, res) => {
    const { name, address, phoneNo, costPerHour, locality, fileURL } = req.body

    if(!name || !address || !phoneNo || !costPerHour || !locality){
        res.status(400).json({ msg: "Please enter all fields" })
    }

    const newTurf = new Turf({
        name,   
        address,
        phoneNo,
        costPerHour,
        locality,
        ownerId: req.user.id,
        fileURL
    })

    newTurf.save()
    .then(turf => {
        res.json(turf)
    })
})

// @route PUT api/turfs/:turfId
// @desc To approve turf
// @access Private
router.put('/:turfId', auth, verifyAdminUser, (req, res, next) => {

     //Check if turf is valid
     if(!ObjectID.isValid(req.params.turfId)){
        return res.status(400).json({ msg: "Invalid turf id" })
    }

    Turf.findById(req.params.turfId)
    .then(turf => {
        if(!turf){
            return res.status(400).json({ msg: "Invalid turf id" })
        }
        turf.updateOne({
            isApproved: true
        })
        .then(turf => {
            return res.json({ msg: "Turf has been approved"})
        })
    }).catch(err => {
        console.log(err)
    })

})

// @route DELETE api/turfs/:turfId
// @desc Delete a turf
// @access Private

router.delete('/:turfId', auth, verifyBusinessUser, (req, res, next) => {

         //Check if turf is valid
         if(!ObjectID.isValid(req.params.turfId)){
            return res.status(400).json({ msg: "Invalid turf id" })
        }

        Turf.findById(req.params.turfId)
        .then(turf => {
            if(!turf){
                return res.status(400).json({ msg: "Invalid turf id" })
            }

            if(req.user.id !== turf.ownerId) {
                return res.status(401).json({ msg: "Not authorised" })
            }

            Turf.findByIdAndDelete(turf._id)
            .then(() => {
                console.log(turf._id)
                Booking.deleteMany({ "turfId":turf._id })
                .then(() => res.json({ success: true }))
                .catch(err => console.log(err))
            })

        }).catch(err => {
            console.log(err)
        })

} )

// To add/view turf
function verifyBusinessUser(req, res, next){
    if(!canAddTurf(req.user)){
        return res.status(401).json({msg: "Cannot add/view Turf, not a business user"})
    }
    next()
}

// To approve turfs
function verifyAdminUser(req, res, next){
    if(!req.user.role === 'ADMIN'){
        return res.status(401).json({msg: "Cannot approve Turf, not an admin user"})
    }
    next()
}

module.exports = router