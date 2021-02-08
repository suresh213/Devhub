import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const ProfileAbout = ({ profile: { bio, skills } }) => {
  return (
    <div class='profile-about bg-light p-2'>
      {bio && <Fragment></Fragment>}
      <h2 class='text-primary'>Bio</h2>
      <p>{bio}</p>
      <div class='line'></div>
      <h2 class='text-primary'>Skills</h2>
      <div class='skills'>
        {skills.map((skill, index) => (
          <div key={index} class='p-1'>
            <i class='fa fa-check'></i> {skill}
          </div>
        ))}
      </div>
    </div>
  );
};

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileAbout;
