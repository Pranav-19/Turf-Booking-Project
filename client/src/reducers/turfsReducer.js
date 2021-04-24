import { GET_TURFS, TURFS_LOADING, GET_TURFS_ERROR, SELECT_TURF } from '../actions/types'

const initialState = {
    turfs: [],
    isLoading: false,
    selectedTurf: null
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
        case SELECT_TURF:
            return{
                ...state,
                selectedTurf:action.payload
            }
        default:
            return state;
    }
}