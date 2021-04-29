const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')

//User model
const User = require('../../models/User')

// @route POST api/users
// @desc Create a user
// @access Public
router.post('/', (req, res) => {
    const { name, email, password, role } = req.body;

    if(!name || !email || !password || !role){
        res.status(400).json({ msg: "Please enter all fields" })
    }

    User.findOne({email})
    .then( user => {
        if(user){
            res.status(400).json({ msg: "User already exists" });
         }

         const newUser = new User({
             name,
             email,
             password,
             role
         })

         bcrypt.genSalt(10, (err,salt) => {
             bcrypt.hash(newUser.password, salt, (err, hash) => {
                 if(err) throw err

                 newUser.password = hash
                 newUser.save()
                 .then(user => {
                     jwt.sign(
                         {id: user.id, role: user.role},
                         config.get('jwtSecret'),
                         { expiresIn: 3600 },
                         (err, token) => {
                             if(err) throw err

                             res.json({
                                 token,
                                 user:{
                                     _id: user._id,
                                     name: user.name,
                                     email: user.email,
                                     role: user.role
                                 }
                             })
                         }
                     )
                 })
             })
         })
    })
})

module.exports = router