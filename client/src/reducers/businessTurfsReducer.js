import { GET_BUSINESS_TURFS, BUSINESS_TURFS_LOADING, GET_BUSINESS_TURFS_ERROR } from '../actions/types'

const initialState = {
    businessTurfs: [],
    isLoading: false
}

export default function(state = initialState, action) {
    switch(action.type){
        case GET_BUSINESS_TURFS: 
            return {
                ...state,
                isLoading: false,
                businessTurfs: action.payload
            }
        case BUSINESS_TURFS_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case GET_BUSINESS_TURFS_ERROR:
            return {
                ...state,
                isLoading: false
            }
        default:
            return state;
    }
}