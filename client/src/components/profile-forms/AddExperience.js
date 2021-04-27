import React, { useState, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExperience } from '../../actions/profile';
const AddExperience = ({ addExperience, history }) => {
  const [formData, setformData] = useState({
    company: '',
    location: '',
    title: '',
    from: '',
    to: '',
    current: false,
    description: '',
  });
  const [toDateDisabled, toggletoDate] = useState(false);
  const { company, location, title, from, to, current, description } = formData;

  const onChange = (e) =>
    setformData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    addExperience(formData, history);
  };
  return (
    <div>
      <div className='create-profile'>
        <h1 className='large text-primary'>Add an Experience</h1>
        <p className='lead'>
          <i className='fas fa-code-branch'></i> Add your past and current
          experiences...
        </p>
        <form className='form' onSubmit={(e) => onSubmit(e)}>
          <div className='form-group'>
            <input
              type='text'
              placeholder='* Job Title'
              name='title'
              value={title}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='* Company'
              name='company'
              value={company}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Location'
              name='location'
              value={location}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className='form-group'>
            <h4>From Date</h4>
            <input
              type='date'
              name='from'
              value={from}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className='form-group'>
            <p>
              <input
                type='checkbox'
                name='current'
                value={current}
                onChange={(e) => {
                  setformData({ ...formData, current: !current });
                  toggletoDate(!toDateDisabled);
                }}
              />{' '}
              Current Job
            </p>
          </div>
          {!toDateDisabled && (
            <Fragment>
              <div className='form-group'>
                <h4>To Date</h4>
                <input
                  type='date'
                  name='to'
                  value={to}
                  onChange={(e) => onChange(e)}
                  disabled={toDateDisabled ? 'disabled' : ''}
                />
              </div>
            </Fragment>
          )}

          <div className='form-group'>
            <textarea
              name='description'
              cols='30'
              rows='5'
              placeholder='Job Description'
              value={description}
              onChange={(e) => onChange(e)}
            ></textarea>
          </div>
          <input type='submit' className='btn btn-primary my-1' />
          <Link className='btn btn-light my-1' to='/dashboard'>
            Go Back
          </Link>
        </form>
      </div>
    </div>
  );
};
AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
};

export default connect(null, { addExperience })(withRouter(AddExperience));
