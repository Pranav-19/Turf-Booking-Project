const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const config = require('config')
const bcrypt = require('bcryptjs')

//User model
const User = require('../../models/User')



// @route POST api/auth
// @desc Post an item
// @access Public
router.post('/', (req, res) => {

    const { email, password } = req.body;

    if(!email || !password){
        res.status(400).json({ msg: "Please enter all fields" })
    }

    User.findOne({email})
    .then(user => {
        if(!user){
            res.status(400).json({ msg: "User does not exist" })
        }
        
        bcrypt.compare(password, user.password)
        .then( isMatch => {
            if(!isMatch) res.status(400).json({ msg: "Invalid credentials" })

            jwt.sign(
                { id: user.id, role: user.role },
                config.get('jwtSecret'),
                { expiresIn: 3600 },
                (err, token) => {
                   if(err) throw err;
                   
                   res.json({
                      token,
                      user:{
                         id: user.id,
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

module.exports = router
