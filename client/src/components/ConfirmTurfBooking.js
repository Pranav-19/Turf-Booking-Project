import React, { useState } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { makeStyles } from '@material-ui/core/styles'
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from '@material-ui/core/Button'
import { withRouter } from "react-router-dom"
import axios from 'axios'
import { connect } from 'react-redux'
import { Alert } from 'reactstrap'
import EventRoundedIcon from '@material-ui/icons/EventRounded'
import AccessTimeRounded from '@material-ui/icons/AccessTimeRounded'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
    modal: {
      marginTop: 75
    },
    modalBackdrop: {
        opacity:0.5
    }
  }))

function ConfirmTurfBooking({ isOpen,onToggle, turf, slot, auth, date, history }) {
    const classes = useStyles()
    const [msg, setMsg] = useState(null)
    console.log(date, slot)

    const onConfirmBooking = async () => {
      console.log(date)
      if(!auth.isAuthenticated){
        setMsg("You need to login in order to book a slot")
        return;
      }
      const newBooking = {
        turf,
        timing: `${date.toDateString()} ${slot.timing.substring(0,8)}`,
        user: auth.user
      }
      const config = {
        headers:{
            "Content-type": "application/json",
            "x-auth-token": `${auth.token}`
        }
    }


      const response = await axios.post(`/api/bookings/${turf._id}`,newBooking, config)
      console.log(response.data)
      onToggle(slot)
      history.push('/myBookings')
    }

    return (
        <Modal
            isOpen={isOpen}
            toggle={() => onToggle(slot)}
            className={classes.modal}>
 <ModalHeader toggle={() => onToggle(slot)}>Confirm Booking</ModalHeader>
        <ModalBody>
         Do you want to confirm this booking? 
         <br />
         <br />
{     slot &&  <>
        <Typography variant="body1">
            <EventRoundedIcon /> {date.toDateString()}
          </Typography>
          <Typography variant="body1">
             <AccessTimeRounded width={1} />  {slot.timing}
         </Typography>
         </>
}
        {msg && <Alert color="danger" >{msg}</Alert>}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={onConfirmBooking}>Confirm</Button>{' '}
          <Button color="secondary" onClick={() => onToggle(slot)}>Cancel</Button>
        </ModalFooter>
        </Modal>
    )
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default withRouter(connect(mapStateToProps,null)(ConfirmTurfBooking))
