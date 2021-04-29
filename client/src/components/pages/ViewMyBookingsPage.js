import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import BookingCard from '../BookingCard'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { Alert } from 'reactstrap'

const useStyles = makeStyles(theme => ({
    header:{
        fontWeight: '600',
        margin:25,
      //   marginTop:80,
        fontStyle: 'italic',
        lineHeight: '2rem',
        letterSpacing: '0.1rem'
    }
}))


function ViewMyBookingsPage(props) {

    const [bookings, setBookings] = useState([])
    const {auth} = props
    const classes = useStyles()
    useEffect(() => {
        if(auth.isAuthenticated){
            const config = {
                headers:{
                    "x-auth-token": `${auth.token}`
                }
            }
            console.log(auth)
            axios.get(`/api/bookings/users/${auth.user._id}`,config)
            .then(res => {
                console.log(res.data)
                setBookings(res.data.bookings)
            })
            .catch(err => console.log(err.response))
        }
    },[])
    
    return (
        <div>
            <Typography variant="h4" className={classes.header} color="primary"  >
               My Bookings
            </Typography>
            { bookings.map(booking => (
                <BookingCard booking={booking} key={booking._id}  />
            ))}

        {  bookings.length === 0 && <Alert color="danger" >No results found </Alert> }
        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, null)(ViewMyBookingsPage)
