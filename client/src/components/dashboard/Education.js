import React, { Fragment } from 'react';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteEducation } from '../../actions/profile';
const Education = ({ education, deleteEducation }) => {
  console.log(education);

  return (
    <Fragment>
      <div className='profile-exp bg-white'>
        <h1 className='my-2'>Education</h1>
        {education.map((item) => (
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
        ))}
      </div>
    </Fragment>
  );
};
Education.propTypes = {
  education: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired,
};
export default connect(null, { deleteEducation })(Education);
