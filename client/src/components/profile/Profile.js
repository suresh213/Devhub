import React, { Fragment, useEffect } from 'react';
import Spinner from '../layouts/Spinner';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { getProfileById } from '../../actions/profile';
import { Link, Redirect } from 'react-router-dom';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import GithubRepos from './GithubRepos';
import { PROFILE_ERROR, GET_PROFILE } from '../../actions/types';
import axios from 'axios';

const Profile = ({
  getProfileById,
  profile: { profile, loading },
  auth,
  match,
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    getProfileById(match.params.id);
    axios
      .get(`/api/profile/user/${match.params.id}`)
      .then((res) => {
        dispatch({
          type: GET_PROFILE,
          payload: res.data,
        });
      })

      .catch((err) => {
        dispatch({
          type: GET_PROFILE,
          payload: null,
        });
        dispatch({
          type: PROFILE_ERROR,
          payload: {
            msg: err.response.statusText,
            status: err.response.status,
          },
        });
      });
    console.log(profile);
  }, []);

  // if (
  //   auth.isAuthenticated &&
  //   auth.loading === false &&
  //   profile &&
  //   profile.user
  //   // profile.user._id === auth.user._id
  // ) {
  //   return <Redirect to='/dashboard' />;
  // }

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : profile === null ? (
        <h3 style={{ textAlign:'center', marginTop: '50px' }}>
          No profile found for this user..{' '}
        </h3>
      ) : (
        <Fragment>
          {/* {auth.isAuthenticated &&
            auth.loading === false &&
            profile.user._id === auth.user._id && (
              <Link to='/edit-profile' className='btn btn-dark'>
                Edit profile
              </Link>
            )} */}
          <Link to='/developers' className='btn btn-light'>
            Back to profiles
          </Link>
          <div className='profile-grid my-1'>
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            <div className='profile-exp bg-white p-2'>
              <h2 className='text-primary'>Experience</h2>
              {profile.experience.length > 0 ? (
                <Fragment>
                  {profile.experience.map((experience) => (
                    <ProfileExperience
                      key={experience._id}
                      experience={experience}
                    />
                  ))}
                </Fragment>
              ) : (
                <h2>No experience Found</h2>
              )}
            </div>

            <div className='profile-edu bg-white p-2'>
              <h2 className='text-primary'>Education</h2>
              {profile.education.length > 0 ? (
                <Fragment>
                  {profile.education.map((education) => (
                    <ProfileEducation
                      key={education._id}
                      education={education}
                    />
                  ))}
                </Fragment>
              ) : (
                <h2>No education Found</h2>
              )}
            </div>

            {profile.githubusername && (
              <GithubRepos username={profile.githubusername} />
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});
export default connect(mapStateToProps, { getProfileById })(Profile);
