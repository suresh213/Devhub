import React, { Fragment } from 'react';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteEducation } from '../../actions/profile';
import { Link } from 'react-router-dom';
const Education = ({ education, deleteEducation }) => {
  console.log(education);

  return (
    <Fragment>
      <div className='profile-exp bg-white'>
        <div
          className=' exp-head'
        >
          <h2>Education</h2>
          <Link to='add-education' className='btn btn-dark'>
            <i className='fa fa-plus '></i>
          </Link>
        </div>

        {education.length > 0 ? (
          education.map((item) => (
            <div key={item._id}>
              <h2>{item.school}</h2>
              <h3 className=''>{item.degree}</h3>
              <p>
                <Moment format='YYYY/MM/DD'>{item.from}</Moment> -
                {item.current ? (
                  'Present'
                ) : (
                  <Moment format='YYYY/MM/DD'>{item.to}</Moment>
                )}
              </p>
              <button
                onClick={() => deleteEducation(item._id)}
                className='btn btn-danger'
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <div>Add Some details</div>
        )}
      </div>
    </Fragment>
  );
};
Education.propTypes = {
  education: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired,
};
export default connect(null, { deleteEducation })(Education);
