import React, { useState } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { makeStyles } from '@material-ui/core/styles'
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from '@material-ui/core/Button'
import { withRouter } from "react-router-dom"
import axios from 'axios'
import { connect } from 'react-redux'
import { Alert } from 'reactstrap'

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
    const onConfirmBooking = async () => {
      console.log(date)
      if(!auth.isAuthenticated){
        setMsg("You need to login in order to book a slot")
        return;
      }
      const newBooking = {
        turf,
        timing: `${date.toDateString()} ${slot.timing.substring(0,8)}`
      }
      const config = {
        headers:{
            "Content-type": "application/json",
            "x-auth-token": `${auth.token}`
        }
    }


      const response = await axios.post(`/api/bookings/${turf._id}`,newBooking, config)
      console.log(response.data)
      onToggle()
      history.push('/myBookings')
    }

    return (
        <Modal
            isOpen={isOpen}
            toggle={onToggle}
            className={classes.modal}>
 <ModalHeader toggle={onToggle}>Confirm Booking</ModalHeader>
        <ModalBody>
         Do you want to confirm this booking? 
        {msg && <Alert color="danger" >{msg}</Alert>}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={onConfirmBooking}>Confirm</Button>{' '}
          <Button color="secondary" onClick={onToggle}>Cancel</Button>
        </ModalFooter>
        </Modal>
    )
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default withRouter(connect(mapStateToProps,null)(ConfirmTurfBooking))
