import React, { useState, useEffect, Fragment } from 'react';
import { getProfiles } from '../../actions/profile';
import Spinner from '../layouts/Spinner';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ProfileItem from '../profiles/ProfileItem';
const Search = ({ getProfiles, profile: { loading, profiles } }) => {
  const [name, setName] = useState('');
  const [resultProfiles, setResultProfiles] = useState([]);
  const [load, setLoad] = useState(false);
  useEffect(() => {
    getProfiles();
    setResultProfiles(profiles);
  }, [getProfiles]);

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
          <h2>Results..</h2>
          <input
            type='text'
            onChange={(e) => setName(e.target.value)}
            placeholder='Enter name to search'
          />
          <div className='profiles'>
            {resultProfiles.length > 0 ? (
              resultProfiles.map((profile) => (
                <ProfileItem key={profile._id} profile={profile} />
              ))
            ) : (
              <h4>No Profiles Found</h4>
            )}
          </div>
        </Fragment>
      )}
    </div>
  );
};
Search.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
});
export default connect(mapStateToProps, { getProfiles })(Search);
