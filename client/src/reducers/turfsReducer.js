import { GET_TURFS, TURFS_LOADING, GET_TURFS_ERROR } from '../actions/types'

const initialState = {
    turfs: [],
    isLoading: false
}

export default function(state = initialState, action) {
    switch(action.type){
        case GET_TURFS: 
            return {
                ...state,
                isLoading: false,
                turfs: action.payload
            }
        case TURFS_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case GET_TURFS_ERROR:
            return {
                ...state,
                isLoading: false
            }
        default:
            return state;
    }
}