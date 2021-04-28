import React, { useState, useEffect, Fragment } from 'react';
import { getProfiles } from '../../actions/profile';
import Spinner from '../layouts/Spinner';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import ProfileItem from '../profiles/ProfileItem';
import {
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  GET_REPOS,
  GET_PROFILES,
  CLEAR_PROFILE,
} from '../../actions/types';
import axios from 'axios';
const Profiles = ({ getProfiles, profile: { loading, profiles }, auth }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [resultProfiles, setResultProfiles] = useState([]);
  const [allProfiles, setAllProfiles] = useState([]);
  const [load, setLoad] = useState(false);
  useEffect(() => {
    setLoad(true);
    axios
      .get('/api/profile/allProfiles')
      .then((res) => {
        setResultProfiles(res.data);
        setAllProfiles(res.data);
        setLoad(false);
        dispatch({
          type: GET_PROFILES,
          payload: res.data,
        });
      })
      .catch((err) => {
        setLoad(false);
        dispatch({
          type: PROFILE_ERROR,
          payload: {
            msg: err.response.statusText,
            status: err.response.status,
          },
        });
      });
  }, []);

  useEffect(() => {
    if (name.length === 0) {
      setResultProfiles(allProfiles);
      return;
    }
    setLoad(true);
    let search = profiles.filter((user) =>
      user.name.toLowerCase().includes(name.toLowerCase())
    );
    setResultProfiles(search);
    setLoad(false);
  }, [name]);

  return (
    <div>
      {loading || load ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className='profiles-page'>
            <input
              type='text'
              onChange={(e) => setName(e.target.value)}
              placeholder='Enter name to search'
            />
            <div className='profiles'>
              {resultProfiles && resultProfiles.length > 0 ? (
                resultProfiles.map(
                  (profile) =>
                    profile.user._id !== auth.user._id && (
                      <ProfileItem key={profile._id} profile={profile} />
                    )
                )
              ) : (
                <div>
                  <h4>No Profiles Found</h4>
                </div>
              )}
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
};
Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});
export default connect(mapStateToProps, { getProfiles })(Profiles);
