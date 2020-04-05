import { combineReducers } from 'redux';
import authReducer from './authReducer';

// whatever keys we provide will be the keys that exist in our state object
export default combineReducers({
    auth: authReducer
})