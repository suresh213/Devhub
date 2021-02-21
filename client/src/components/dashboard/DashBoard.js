import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import Spinner from '../layouts/Spinner';
import { Link } from 'react-router-dom';
import DashBoardActions from './DashBoardActions';
import Experience from './Experience';
import Education from './Education';

const DashBoard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  if (loading && profile === null) {
    return <Spinner />;
  }
  return (
    <Fragment>
      <h1 className='large text-primary'>Dashboard</h1>
      <div className='form-container1'>
        <div>
          <div className='profile-head'>
            <img src={profile && profile.user && profile.user.avatar} alt='' />
            <span>
              <h2> {user && user.name}</h2>
            </span>
          </div>
          {profile && (
            <div>
              <h3 class='lead'>
                {profile && profile.status && <span> {profile.status}</span>}{' '}
                {profile && profile.company && (
                  <span>at {profile.company}</span>
                )}
              </h3>
              <DashBoardActions />
            </div>
          )}
        </div>
        <div>
          {profile ? (
            <Fragment>
              <br />
              <Experience experience={profile.experience} />
              <br />
              <Education education={profile.education} />
            </Fragment>
          ) : (
            <Fragment>
              <p>Please create a profile</p>
              <Link to='create-profile' className='btn btn-primary my-1'>
                Create Profile
              </Link>
            </Fragment>
          )}
        </div>
      </div>
    </Fragment>
  );
};

DashBoard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(DashBoard);
