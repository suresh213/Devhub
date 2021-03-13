import React, { Fragment } from 'react';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExperience } from '../../actions/profile';

const Experience = ({ experience, deleteExperience }) => {
  return (
    <Fragment>
      <div className='profile-exp bg-white'>
        <h1 className='my-2'>Experience</h1>
        {experience.map((item) => (
          <div key={item._id}>
            <h2>{item.company}</h2>
            <h3>{item.title}</h3>
            <p>
              <Moment format='YYYY/MM/DD'>{item.from}</Moment> -
              {item.current ? (
                'Present'
              ) : (
                <Moment format='YYYY/MM/DD'>{item.to}</Moment>
              )}
            </p>
            <button
              onClick={() => deleteExperience(item._id)}
              className='btn btn-danger'
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </Fragment>
  );
};
Experience.propTypes = {
  experience: PropTypes.array.isRequired,
  deleteExperience: PropTypes.func.isRequired,
};
export default connect(null, { deleteExperience })(Experience);
