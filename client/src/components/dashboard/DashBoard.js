import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, uploadProfilePicture } from '../../actions/profile';
import Spinner from '../layouts/Spinner';
import { Link } from 'react-router-dom';
import DashBoardActions from './DashBoardActions';
import Experience from './Experience';
import Education from './Education';
import axios from 'axios';
import BlankProfilePicture from '../../common/assets/dashboard/blank-profile-picture.png';

const DashBoard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
}) => {
  const [profilePicture, setProfilePicture] = useState(user && user.avatar);
  console.log(profilePicture);
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  if (loading && profile === null) {
    return <Spinner />;
  }
  const convertTobase64 = async (file) => {
    return new Promise((resolve, reject) => {
      let fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  const uploadImage = async (file) => {
    const imageStr = await convertTobase64(file);
    const res = await axios.put(
      '/api/profile/upload/profile-pic',
      { image: imageStr },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    setProfilePicture(imageStr);
  };
  const handleChange = (e) => {
    const file = e.target.files[0];
    uploadImage(file);
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Dashboard</h1>
      <div className='form-container1'>
        <div>
          <div className='profile-head'>
            <div className='profile-pic-div'>
              <label for='fileToUpload'>
                <div
                  className='profile-pic'
                  style={{
                    backgroundImage: profilePicture
                      ? `url(${profilePicture})`
                      : `url(${BlankProfilePicture})`,
                  }}
                >
                  <span className='glyphicon glyphicon-camera'></span>
                  <span>Edit</span>
                </div>
              </label>
              <input
                onChange={(e) => handleChange(e)}
                type='File'
                name='fileToUpload'
                id='fileToUpload'
              />
            </div>
            <h2> {user && user.name}</h2>
            <h3>Following: {user ? user.following.length : 0}</h3>
            <h3>Followers: {user ? user.followers.length : 0}</h3>
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
