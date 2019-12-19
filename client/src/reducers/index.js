import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import plan from './plan';
import exercise from './exercise';

export default combineReducers({
    alert,
    auth,
    profile,
    plan,
    exercise
});