const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
var cors = require('cors')


const app = express();
app.use(express.json())

app.use(cors()) // Use this after the variable declaration




//Body parser middleware


// db config
const db = config.get('mongoURILocal')


mongoose.connect(db,{ useUnifiedTopology: true ,useNewUrlParser: true, useCreateIndex: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err))


app.use('/api/users',require('./routes/api/users'))
app.use('/api/auth',require('./routes/api/auth'))
app.use('/api/turfs',require('./routes/api/turfs'))
app.use('/api/bookings',require('./routes/api/bookings'))
app.use('/api/contact',require('./routes/api/contact'))
app.use('/api/temporaryBooking',require('./routes/api/temporaryBooking'))


const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log("Server is running on port: ",port)
})
