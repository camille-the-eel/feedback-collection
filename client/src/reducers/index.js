import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';


// whatever keys we provide will be the keys that exist in our state object
// key form: must be used according to redux-form doc
export default combineReducers({
    auth: authReducer,
    form: reduxForm
})