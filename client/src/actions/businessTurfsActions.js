import axios from 'axios'
import { GET_BUSINESS_TURFS, BUSINESS_TURFS_LOADING, GET_BUSINESS_TURFS_ERROR } from './types'
import { tokenConfig } from './authActions'
import { returnErrors } from './errorActions'

export const getBusinessTurfs = () => (dispatch, getState) => {
    dispatch({ type: BUSINESS_TURFS_LOADING })

    axios.get('/api/turfs/myTurfs',tokenConfig(getState))
    .then(res => {
        dispatch({ type: GET_BUSINESS_TURFS, payload: res.data })
    })
    .catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status));
        
        dispatch({
            type: GET_BUSINESS_TURFS_ERROR
        });
    })
}
