import React, { useState, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { login } from '../../actions/auth';
import { connect } from 'react-redux';
import developerImg from '../../common/assets/developer.png';
import Spinner from '../layouts/Spinner';
toast.configure();

const Login = ({ login, isAuthenticated, auth }) => {
  const [formData, setformData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;
  const onChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Enter Credentials');
      return;
    }
    console.log(auth);
    login({ email, password });
  };
  
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <div className='login'>
        <div className='side-img'>
          <img src={developerImg} alt='' />
        </div>
        <div>
          <form className='form' onSubmit={(e) => onSubmit(e)}>
            <p className='lead'>
              <i className='fas fa-user'></i>
              <h5 className='large text-primary'>Sign In</h5>
            </p>
            <div className='form-group'>
              <input
                type='email'
                placeholder='Email Address'
                name='email'
                value={email}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className='form-group'>
              <input
                type='password'
                placeholder='Password'
                name='password'
                value={password}
                onChange={(e) => onChange(e)}
              />
            </div>
            <button type='submit' className='btn btn-primary'>
              Login
            </button>
            <div className='my-1 foot'>
              <div>Don't have account ?</div>
              <h4>
                <Link to='/register'>Sign Up</Link>
              </h4>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};
Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth,
});
export default connect(mapStateToProps, { login })(Login);
