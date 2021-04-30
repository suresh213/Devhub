import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { getCurrentProfile, uploadProfilePicture } from '../../actions/profile';
import Spinner from '../layouts/Spinner';
import { Link } from 'react-router-dom';
import Experience from './Experience';
import Education from './Education';
import axios from 'axios';
import BlankProfilePicture from '../../common/assets/dashboard/blank-profile-picture.png';
import GithubRepos from '../profile/GithubRepos';
import { AUTH_ERROR, USER_LOADED } from '../../actions/types';

const DashBoard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
}) => {
  const dispatch = useDispatch();

  const [profilePicture, setProfilePicture] = useState(user && user.avatar);
  const [mobileView, setMobileView] = useState(false);
  const [load, setLoad] = useState(false);
  const resize = () => {
    setMobileView(window.innerWidth <= 600);
  };

  useEffect(() => {
    resize();
    window.addEventListener('resize', resize);
  }, []);

  useEffect(() => {
    getCurrentProfile();
    axios
      .get('/api/register')
      .then((res) => {
        // console.log(res.data);
        dispatch({
          type: USER_LOADED,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: AUTH_ERROR,
        });
      });
    // console.log(profile);
  }, [getCurrentProfile, profilePicture]);

  if (loading || load) {
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
    setLoad(true);
    axios
      .put(
        '/api/profile/upload/profile-pic',
        { image: imageStr },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((res) => {
        setProfilePicture(imageStr);
        setLoad(false);
      })
      .catch((err) => {
        setLoad(false);
        console.log(err);
      });
  };
  const handleChange = (e) => {
    const file = e.target.files[0];
    uploadImage(file);
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Dashboard</h1>

      <div className='form-container1'>
        <div className='profile-head-div'>
          <div className='profile-head'>
            <div className='profile-pic-div'>
              <label for='fileToUpload'>
                <div
                  className='profile-pic'
                  style={{
                    backgroundImage: `url(${profilePicture})`,
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
            <div>
              <h2> {user && user.name}</h2>
              <div className='flex'>
                <h3>Following: {user ? user.following.length : 0}</h3>
                <h3>Followers: {user ? user.followers.length : 0}</h3>
              </div>
            </div>
          </div>
          {profile && (
            <div>
              <h3 className='lead'>
                {profile && profile.status && <span> {profile.status}</span>}{' '}
                {profile && profile.company && (
                  <span>at {profile.company}</span>
                )}
              </h3>
              {profile && profile.bio && <p class='lead'>Bio: {profile.bio}</p>}
              <Link to='edit-profile' className='btn btn-dark'>
                <i className='fas fa-user-circle text-primary'></i> Edit Profile
              </Link>
            </div>
          )}
          {!mobileView && (
            <div className='git-repos'>
              {profile && profile.githubusername && (
                <GithubRepos username={profile.githubusername} />
              )}
            </div>
          )}
        </div>
        <div>
          {profile ? (
            <Fragment>
              <div className='your-skills'>
                <h5>Your Skills:</h5>
                <ul>
                  {profile.skills.map((skill) => (
                    <li>{skill}</li>
                  ))}
                </ul>
              </div>
              <br />
              <Experience experience={profile.experience} />
              <br />
              <Education education={profile.education} />
              <div className='social-texts'>
                <h5>Social links:</h5>
                <div class='form-group social-text'>
                  <i class='fab fa-linkedin fa-2x'></i>
                  <a
                    href={
                      profile.social.linkedin.length > 0
                        ? profile.social.linkedin
                        : ''
                    }
                  >
                    {profile.social.linkedin.length > 0
                      ? profile.social.linkedin
                      : 'No link found'}
                  </a>
                </div>
                <div class='form-group social-text'>
                  <i class='fab fa-twitter fa-2x'></i>
                  <a
                    href={
                      profile.social.twitter.length > 0
                        ? profile.social.twitter
                        : ''
                    }
                  >
                    {profile.social.twitter.length > 0
                      ? profile.social.twitter
                      : 'No link found'}
                  </a>
                </div>

                <div class='form-group social-text'>
                  <i class='fab fa-facebook fa-2x'></i>
                  <a
                    href={
                      profile.social.facebook.length > 0
                        ? profile.social.facebook
                        : ''
                    }
                  >
                    {profile.social.facebook.length > 0
                      ? profile.social.facebook
                      : 'No link found'}
                  </a>
                </div>

                <div class='form-group social-text'>
                  <i class='fab fa-youtube fa-2x'></i>
                  <a
                    href={
                      profile.social.youtube.length > 0
                        ? profile.social.youtube
                        : ''
                    }
                  >
                    {profile.social.youtube.length > 0
                      ? profile.social.youtube
                      : 'No link found'}
                  </a>
                </div>

                <div class='form-group social-text'>
                  <i class='fab fa-instagram fa-2x'></i>
                  <a
                    href={
                      profile.social.instagram.length > 0
                        ? profile.social.instagram
                        : ''
                    }
                  >
                    {profile.social.instagram.length > 0
                      ? profile.social.instagram
                      : 'No link found'} 
                  </a>
                </div>
              </div>
              {/* {profile && (
                <div className='share-profile'>
                  <h3>Share your profile:</h3>
                  <a
                    href={`https://dev-hub-network.herokuapp.com/profile/${profile._id}`}
                    target='_blank'
                  >
                    https://dev-hub-network.herokuapp.com/profile/{profile._id}
                  </a>
                </div>
              )}{' '} */}
              {mobileView && (
                <div className='git-repos'>
                  {profile.githubusername && (
                    <GithubRepos username={profile.githubusername} />
                  )}
                </div>
              )}
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
