import { combineReducers } from 'redux'
import authReducer from './authReducer'
import errorReducer from './errorReducer'
import turfsReducer from './turfsReducer'
import businessTurfsReducer from './businessTurfsReducer'

export default combineReducers({
    auth: authReducer,
    error: errorReducer,
    turfs: turfsReducer,
    businessTurfs: businessTurfsReducer
})