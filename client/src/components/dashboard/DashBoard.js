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

const base64Flag = 'data:image.jpeg;base64,';
const DashBoard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
}) => {
  const [file, setFile] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  // useEffect(() => {
  //   console.log(profilePicture);
  //   uploadProfilePicture(profilePicture);
  // }, [profilePicture]);

  if (loading && profile === null) {
    return <Spinner />;
  }

  const arrayBufferToBase64 = (buffer) => {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  };

  const getbase64 = async (file) => {
    const formdata = new FormData();
    formdata.append('file', file);
    try {
      const res = await axios.put('/api/profile/upload/profile-pic', formdata, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const buffer = res.data;
      const imagestr = arrayBufferToBase64(buffer.data.data);
      setProfilePicture(imagestr);
    } catch (err) {
      console.log('error' + err);
    }
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    getbase64(file);
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
                    backgroundImage: `url(${base64Flag + profile})`,
                  }}
                >
                  {/* <img
                    src={profile && profile.user && profile.user.avatar}
                    alt=''
                  /> */}
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
            <h3>Following: {user.following.length}</h3>
            <h3>Followers: {user.followers.length}</h3>
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
