import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import { Modal, ModalHeader, ModalBody} from 'reactstrap';
import { makeStyles } from '@material-ui/core/styles'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Alert } from 'reactstrap'
import { useFormik } from 'formik';
import * as yup from 'yup';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import axios from 'axios'
import { withRouter } from "react-router-dom"
import Thumb from '../Thumb'
import { storage } from '../../firebase';


const validationSchema = yup.object({
    name: yup
      .string('Enter Turf name')
      .required('Turf name is required'),
    locality: yup
      .string('Enter locality of your Turf')
      .min(6, 'Locality should be of minimum 6 characters length')
      .required('Locality is required'),
    address: yup
      .string('Enter address of your Turf')
      .min(15, 'Address should be of minimum 15 characters length')
      .required('Address is required'),
    phoneNo: yup
      .number('Enter your phone number').positive().integer()
      .min(10, 'Phone number should be of minimum 10 characters length')
      .required('Phone number is required'),
    costPerHour: yup
      .number('Enter cost per hour of your Turf').positive().integer()
      .required('Cost per hour is required')
  });

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    textField: {
        margin:10
    },
    addTurfButton: {
        marginTop:12
    },
    modal: {
      marginTop: 75
    }
  }))
  

function AddTurfPage({auth,history}) {

    const [isOpen,toggleIsOpen] = useState(false);
    const [msg,setMsg] = useState(null)

    const onToggle = () => { 
        toggleIsOpen(!isOpen)
      }
      const classes = useStyles()

      const formik = useFormik({
        initialValues: {
          name: '',
          locality: '',
          address: '',
          phoneNo: '',
          costPerHour: 150,
          file: null
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
          alert(JSON.stringify(values));
          console.log(values)
          const { file } = values
          const uploadTask = storage.ref(`images/${auth.user._id}/${file.name}`).put(file);
          uploadTask.on('state_changed', 
          (snapshot) => {
            // progrss function ....
            // const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            // this.setState({progress});
          }, 
          (error) => {
               // error function ....
            console.log(error);
          }, 
        () => {
            // complete function ....
            storage.ref(`/images/${auth.user._id}`).child(file.name).getDownloadURL().then(url => {
                console.log(url);
                if(!auth.isAuthenticated){
                  setMsg("You should be logged in")
                  return;
              }
              console.log(values)
      
              let newTurf = {
                  ...values,
                  fileURL: url
              }
      
              console.log(newTurf)
              
              const config = {
                  headers:{
                      "Content-type": "application/json;charset=UTF-8",
                      "x-auth-token": `${auth.token}`
                  }
              }
      
              axios.post(`/api/turfs`,JSON.stringify(newTurf), config)
              .then(res => {
                  console.log(res.data)
                  onToggle()
                  history.push('/myTurfs')
              })
              .catch(err => {
                  console.log(err.response)
              })

            })
        });

        },
      });

  

    return (
        <div>
            <Button color="inherit" onClick={onToggle} >
                Add Turf
            </Button>
            <Modal
                isOpen={isOpen}
                toggle={onToggle}
                className={classes.modal}>
            <ModalHeader>
                Add a Turf
            </ModalHeader>
            <ModalBody>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="name"
          name="name"
          label="Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={(formik.touched.name && Boolean(formik.errors.name))}
          helperText={formik.touched.name && formik.errors.name}
          className={classes.textField}
        />
        <TextField
          fullWidth
          id="locality"
          name="locality"
          label="Locality"
          value={formik.values.locality}
          onChange={formik.handleChange}
          error={formik.touched.locality && Boolean(formik.errors.locality)}
          helperText={formik.touched.locality && formik.errors.locality}
          className={classes.textField}
        />
        <TextField
          fullWidth
          id="address"
          name="address"
          label="Address"
          value={formik.values.address}
          onChange={formik.handleChange}
          error={formik.touched.address && Boolean(formik.errors.address)}
          helperText={formik.touched.address && formik.errors.address}
          className={classes.textField}
        />
        <TextField
          fullWidth
          id="phoneNo"
          name="phoneNo"
          label="Phone number"
          value={formik.values.phoneNo}
          onChange={formik.handleChange}
          error={formik.touched.phoneNo && Boolean(formik.errors.phoneNo)}
          helperText={formik.touched.phoneNo && formik.errors.phoneNo}
          className={classes.textField}
        />
        <TextField
          fullWidth
          id="costPerHour"
          name="costPerHour"
          label="Cost per hour"
          value={formik.values.costPerHour}
          onChange={formik.handleChange}
          error={formik.touched.costPerHour && Boolean(formik.errors.costPerHour)}
          helperText={formik.touched.costPerHour && formik.errors.costPerHour}
          className={classes.textField}
        />
                <div className="form-group">
                  <label for="file">file upload</label>
                  <input id="file" name="file" type="file"  onChange={(event) => {
                    formik.setFieldValue("file",event.currentTarget.files[0]);
                    console.log(event.currentTarget.files)
                  }} className="form-control" />
                

                   {formik.values.file &&  <Thumb file={formik.values.file} />}
                </div>

        <Button  color="primary" variant="outlined" fullWidth type="submit" className={classes.addTurfButton}>
          Add Turf
        </Button>
      </form>
      <br />
      {msg && <Alert color="danger" >{msg}</Alert>}
      </ModalBody>  
    </Modal>
    </div>
    )
}


const mapStateToProps = state => ({
    auth: state.auth
  });
  

export default withRouter(connect(mapStateToProps,null)(AddTurfPage))
