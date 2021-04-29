import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Modal, ModalHeader, ModalBody} from 'reactstrap';
import { makeStyles } from '@material-ui/core/styles'
import 'bootstrap/dist/css/bootstrap.min.css'
import { connect } from 'react-redux';
import { login } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';
import { Alert } from 'reactstrap'


const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(5, 'Password should be of minimum 5 characters length')
    .required('Password is required'),
});

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    textField: {
        margin:10
    },
    loginButton: {
        marginTop:12
    },
    modal: {
      marginTop: 75
    }
  }))

const Login = props => {

    const [isOpen,toggleIsOpen] = useState(false);
    const [msg,setMsg] = useState(null);

    const onToggle = () => {
      props.clearErrors()

      toggleIsOpen(!isOpen)
      setMsg(null)
    }

    useEffect(() => {
      const { error, isAuthenticated } = props;
      if(error.msg.msg !== msg ){
          if(error.id === 'LOGIN_FAIL'){
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
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      const { email, password } = values;

      const user = {
          email,
          password
      };

      //Attempt to login
      props.login(user);
    },
  });



  const classes = useStyles()

  return (
    <div>
       <Button color="inherit" onClick={onToggle} >
        Login
       </Button>

       <Modal
       isOpen={isOpen}
       toggle={onToggle}
       className={classes.modal}
       >
        <ModalHeader>
            Login
        </ModalHeader>
        <ModalBody>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={(formik.touched.email && Boolean(formik.errors.email))}
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
        <Button className={classes.loginButton} color="primary" variant="outlined" fullWidth type="submit">
          Login
        </Button>
      </form>
      <br />
      {msg && <Alert color="danger" >{msg}</Alert>}
      </ModalBody>
      </Modal>
  </div>
  );
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(mapStateToProps,{ login, clearErrors })(Login)

