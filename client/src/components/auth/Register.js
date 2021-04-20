import React, { useState, Fragment } from 'react';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import developerImg from '../../common/assets/developer.png';
toast.configure();

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setformData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });
  const { name, email, password, password2 } = formData;
  const onChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    // if (!email || !password || !password2 || name) {
    //   toast.error('Fill all fields');
    //   return;
    // }
    if (password !== password2) {
      toast.error('Password not matched');
      return;
    } else {
      register({ name, email, password });
    }
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
            <div className='lead'>
              <i className='fas fa-user'></i>
              <h5 className='large text-primary'>Sign Up</h5>
            </div>
            <div className='form-group'>
              <input
                type='text'
                placeholder='Name'
                name='name'
                value={name}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className='form-group'>
              <input
                type='email'
                placeholder='Email Address'
                value={email}
                onChange={(e) => onChange(e)}
                name='email'
              />
            </div>
            <div className='form-group'>
              <input
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => onChange(e)}
                name='password'
              />
            </div>
            <div className='form-group'>
              <input
                type='password'
                placeholder='Confirm Password'
                name='password2'
                value={password2}
                onChange={(e) => onChange(e)}
              />
            </div>
            <button type='submit' className='btn btn-primary'>
              Register
            </button>
            <div className='my-1'>
              <p>Already have an account?</p>{' '}
              <span>
                <h4>
                  <Link to='/login'>Sign In</Link>
                </h4>
              </span>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};
Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { setAlert, register })(Register);
