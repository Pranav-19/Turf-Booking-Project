import React, { useState } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { makeStyles } from '@material-ui/core/styles'
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from '@material-ui/core/Button'
import axios from 'axios'
import { connect } from 'react-redux'
import { Alert } from 'reactstrap'
import { withRouter } from "react-router-dom"


const useStyles = makeStyles((theme) => ({
    modal: {
      marginTop: 75
    },
    modalBackdrop: {
        opacity:0.5
    }
  }))

function ConfirmCancelBooking({ onToggle, booking, isOpen, auth, history }) {
    const classes = useStyles()
    const [msg, setMsg] = useState(null)
    console.log(history)

    const onConfirmApproval = async () => {
      if(!auth.isAuthenticated || auth.user._id!== booking.userId){
        setMsg("You need to login to cancel this booking")
        return;
      }
      const config = {
        headers:{
            "x-auth-token": `${auth.token}`
        }
    }

      const response = await axios.delete(`/api/bookings/${booking.turfId}/${booking._id}`, config)
      console.log(response.data)
      onToggle()
      history.go(0)
    }

    return (
        <Modal
            isOpen={isOpen}
            toggle={onToggle}
            className={classes.modal}>
 <ModalHeader toggle={onToggle}>Cancel Booking</ModalHeader>
        <ModalBody>
         Do you want to cancel this Booking? 


        {msg && <Alert color="danger" >{msg}</Alert>}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={onConfirmApproval}>Yes</Button>{' '}
          <Button color="secondary" onClick={onToggle}>No</Button>
        </ModalFooter>
        </Modal>
    )
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default withRouter(connect(mapStateToProps,null)(ConfirmCancelBooking)
)