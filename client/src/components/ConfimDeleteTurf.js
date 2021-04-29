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

function ConfirmDeleteTurf({ onToggle, turf, isOpen, auth, history }) {
    const classes = useStyles()
    const [msg, setMsg] = useState(null)
    console.log(history)

    const onConfirmDelete = async () => {
      if(!auth.isAuthenticated || auth.user._id!== turf.ownerId){
        setMsg("You need to login to delete this turf")
        return;
      }
      const config = {
        headers:{
            "x-auth-token": `${auth.token}`
        }
    }

      const response = await axios.delete(`/api/turfs/${turf._id}`, config)
      console.log(response.data)
      onToggle()
      history.go(0)
    }

    return (
        <Modal
            isOpen={isOpen}
            toggle={onToggle}
            className={classes.modal}>
 <ModalHeader toggle={onToggle}>Delete Turf</ModalHeader>
        <ModalBody>
         Do you want to delete this Turf? 


        {msg && <Alert color="danger" >{msg}</Alert>}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={onConfirmDelete}>Yes</Button>{' '}
          <Button color="secondary" onClick={onToggle}>No</Button>
        </ModalFooter>
        </Modal>
    )
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default withRouter(connect(mapStateToProps,null)(ConfirmDeleteTurf)
)