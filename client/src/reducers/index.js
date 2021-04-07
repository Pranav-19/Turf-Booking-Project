import { combineReducers } from 'redux'
import authReducer from './authReducer'
import errorReducer from './errorReducer'
import turfsReducer from './turfsReducer'

export default combineReducers({
    auth: authReducer,
    error: errorReducer,
    turfs: turfsReducer
})