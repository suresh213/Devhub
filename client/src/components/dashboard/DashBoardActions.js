import React from 'react';
import { Link } from 'react-router-dom';


const DashBoardActions = () => {
  return (
    <div className='dash-buttons'>
      <Link to='edit-profile' className='btn btn-dark'>
        <i className='fas fa-user-circle text-primary'></i> Edit Profile
      </Link>
      <Link to='add-experience' className='btn btn-dark'>
        <i className='fab fa-black-tie text-primary'></i> Add Experience
      </Link>
      <Link to='add-education' className='btn btn-dark'>
        <i className='fas fa-graduation-cap text-primary'></i> Add Education
      </Link>
    </div>
  );
};

export default DashBoardActions;
