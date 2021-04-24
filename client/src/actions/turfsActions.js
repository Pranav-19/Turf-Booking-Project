import axios from 'axios'
import { GET_TURFS, TURFS_LOADING, GET_TURFS_ERROR, SELECT_TURF } from './types'
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

export const selectTurf = (turf) => dispatch => {
    dispatch({ type: SELECT_TURF, payload: turf})
}

