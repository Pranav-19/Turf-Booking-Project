import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Modal, ModalHeader, ModalBody} from 'reactstrap';
import { makeStyles } from '@material-ui/core/styles'
import 'bootstrap/dist/css/bootstrap.min.css'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import { Alert } from 'reactstrap'
import { register } from '../../actions/authActions'
import { clearErrors } from '../../actions/errorActions'
import { connect } from 'react-redux'


const validationSchema = yup.object({
  name: yup
  .string('Enter your name')
  .required('Name is required'),
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    textField: {
        margin:10
    },
    registerButton: {
        marginTop:12
    },
    modal: {
      marginTop: 75
    }
  }))

const Register = (props) => {

    const [isOpen,toggleIsOpen] = React.useState(false);
    const [msg, setMsg] = React.useState(null);
    
    const onToggle = () => {
      props.clearErrors()
      toggleIsOpen(!isOpen)
      setMsg(null)
    }

    useEffect(() => {
      const { error, isAuthenticated } = props;
      if(error.msg.msg !== msg ){
          if(error.id === 'REGISTER_FAIL'){
              setMsg(error.msg.msg)
          }
          else{
            setMsg(error.msg.msg)
          }
      }
      
      if(isOpen){
          if(isAuthenticated){
              onToggle()
          }
      }
    })

    const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      role: "REGULAR"
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.table(values)
      const { name, email, password, role } = values

      //Creating user object
      const newUser = { name, email, password, role };

      //Attempt to register
      props.register(newUser);
    },
  });

  const handleChange = (event) => {
    formik.setFieldValue('role',event.target.value)
    }




  const classes = useStyles()

  return (
    <div>
       <Button color="inherit" onClick={onToggle} >
        Register
       </Button>

       <Modal
       isOpen={isOpen}
       toggle={onToggle}
       className={classes.modal}
       >
        <ModalHeader>
            Register
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
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          className={classes.textField}
        />
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          className={classes.textField}
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          className={classes.textField}
        />
        <br/>
        <br/>
            <FormLabel component="legend">Account type</FormLabel>
            <RadioGroup  value={formik.values.role} onChange={handleChange}>
                <FormControlLabel name='role' value="REGULAR" control={<Radio />} label="Regular" />
                <FormControlLabel name='role' value="BUSINESS" control={<Radio />} label="Business" />
            </RadioGroup>

        <Button className={classes.registerButton} color="primary" variant="outlined" fullWidth type="submit">
          Register
        </Button>
      </form>
      <br/>
      {msg && <Alert color="danger" >{msg}</Alert> }
      </ModalBody>
      </Modal>
  </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error
})

export default connect(mapStateToProps, { register, clearErrors })(Register)

