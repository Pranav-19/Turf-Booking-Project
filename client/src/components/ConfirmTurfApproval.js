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

function ConfirmTurfApproval({ onToggle, turf, isOpen, auth, history }) {
    const classes = useStyles()
    const [msg, setMsg] = useState(null)
    console.log(auth)

    const onConfirmApproval = async () => {
      if(!auth.isAuthenticated || auth.user.role!== "ADMIN"){
        setMsg("You need to login as admin in order to approve a turf")
        return;
      }
      const config = {
        headers:{
            "x-auth-token": `${auth.token}`
        }
    }

      const response = await axios.put(`/api/turfs/${turf._id}`,{ }, config)
      console.log(response.data)
      onToggle()
      history.push('/')
    }

    return (
        <Modal
            isOpen={isOpen}
            toggle={onToggle}
            className={classes.modal}>
 <ModalHeader toggle={onToggle}>Confirm Approval</ModalHeader>
        <ModalBody>
         Do you want to approve this Turf? 


        {msg && <Alert color="danger" >{msg}</Alert>}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={onConfirmApproval}>Confirm</Button>{' '}
          <Button color="secondary" onClick={onToggle}>Cancel</Button>
        </ModalFooter>
        </Modal>
    )
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default withRouter(connect(mapStateToProps,null)(ConfirmTurfApproval)
)