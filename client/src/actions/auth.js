import axios from 'axios';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE,
} from './types.js';
import setAuthToken from '../utils/setAuthToken';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

axios.defaults.baseURL = process.env.API_URL;

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get('/api/register');
    // console.log(res.data);
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
    return res.data;
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};
// Register User
export const register = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post('/api/register', body, config);
    dispatch({ type: REGISTER_SUCCESS, payload: res.data });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => toast(error.msg));
    }
    toast('register fails');
    dispatch({ type: REGISTER_FAIL });
  }
};

// Login User

export const login = ({ email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('/api/login', body, config);
    // console.log(res.data);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    toast('Login Success');
    dispatch(loadUser());
  } catch (err) {
    const errors = await err.response.data.errors;
    if (errors) {
      errors.forEach((error) => toast(error.msg));
    }
    dispatch({ type: LOGIN_FAIL });
    toast('Invalid Credentials');
  }
};

export const logout = () => async (dispatch) => {
  dispatch({
    type: CLEAR_PROFILE,
  });

  dispatch({
    type: LOGOUT,
  });
  toast('Loggedout Successfully');
};
