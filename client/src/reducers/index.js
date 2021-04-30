import { combineReducers } from 'redux';
import auth from './auth';
import profile from './profile';
import post from './post';
import user from './user';
export default combineReducers({  auth, profile, post, user });
