import React, { useState, useEffect, Fragment } from 'react';
import { getProfiles } from '../../actions/profile';
import Spinner from '../layouts/Spinner';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ProfileItem from '../profiles/ProfileItem';
const Profiles = ({ getProfiles, profile: { loading, profiles }, auth }) => {
  const [name, setName] = useState('');
  const [resultProfiles, setResultProfiles] = useState([]);
  const [load, setLoad] = useState(false);
  useEffect(() => {
    getProfiles();
    setResultProfiles(profiles);
  }, [getProfiles]);

  useEffect(() => {
    setResultProfiles(profiles);
  }, []);

  useEffect(() => {
    if (name.length === 0) {
      setResultProfiles(profiles);
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
