import axios from 'axios'
import { GET_TURFS, TURFS_LOADING, GET_TURFS_ERROR } from './types'
import { returnErrors } from './errorActions'

export const getTurfs = () => dispatch => {
    dispatch({ type: TURFS_LOADING })

    axios.get('/api/turfs/approved')
    .then(res => {
        dispatch({ type: GET_TURFS, payload: res.data })
    })
    .catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status));
        
        dispatch({
            type: GET_TURFS_ERROR
        });
    })
}
