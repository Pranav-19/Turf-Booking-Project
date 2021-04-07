import axios from 'axios';
import {
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from './types';
import { returnErrors } from './errorActions';


//Check for token and load user
export const loadUser = () => (dispatch, getState) => {
    //User loading
    dispatch({ type: USER_LOADING });
    
    axios.get('/api/auth/user', tokenConfig(getState))
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            
            dispatch({
                type: AUTH_ERROR
            });
        })

}

//Register
export const register = ({ name, email, password, role }) => dispatch => {

//Setting the headers
const config = {
    headers: {
        "Content-type": "application/json"
    }
};

const body = { name, email, password, role};

axios.post('/api/users', body, config)
.then(res => {
    dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
    })
})
.catch(err => {
    dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
    
    dispatch({
        type: REGISTER_FAIL
    })
})

}

//Login User
export const login = ({ email, password }) => dispatch => {

    //Setting the headers
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    };
    
    const body = { email, password};
    
    axios.post('/api/auth', body, config)
    .then(res => {
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
    })
    .catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
        console.log(err.response.data)
        dispatch({
            type: LOGIN_FAIL
        })
    })
    
    }


//Logout User
export const logout = () => {
    return{
        type: LOGOUT_SUCCESS
    };
}



//Set up config/headers and token
export const tokenConfig = getState => {
    
 //Get token from localstorage
 const token = getState().auth.token;

 //Headers
 const config = {
     headers:{
         "Content-type": "application/json"
     }
 }

 //If token, add to headers
 if(token)
     config.headers['x-auth-token'] = token;

 return config;
}