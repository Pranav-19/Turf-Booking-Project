const config = require('config');
const jwt = require('jsonwebtoken');

function auth(req,res,next){
    const token = req.header('x-auth-token')

     // Check for token
     if(!token) return res.status(401).json({ msg: 'No token, authorisation denied' })

     try{
        //Verify token
        const decoded = jwt.verify(token, config.get('jwtSecret'))

        //Add user from payload
        req.user = decoded
        next()
    }
    catch(e){
        res.status(400).json({ msg: 'Invalid token'})
    }

}

function verifyUser(req,res,next){
    const token = req.header('x-auth-token')
     // Check for token
     if(!token) return res.status(401).json({ msg: 'No token, authorisation denied' })
     try{
        //Verify token
        const decoded = jwt.verify(token, config.get('jwtSecret'))

        //Add user from payload
        req.user = decoded
        if(req.user.id !== req.params.userId)
            return res.status(401).json({ msg: 'You are not authorised' })
        next()
    }
    catch(e){
        res.status(400).json({ msg: 'Invalid token'})
    }
}


module.exports = {
    auth,
    verifyUser
}