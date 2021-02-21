import React, { useState, useEffect, Fragment } from 'react';
import { getProfilesByName } from '../../actions/profile';
import Spinner from '../layouts/Spinner';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ProfileItem from '../profiles/ProfileItem';
const Search = ({ getProfilesByName, profile: { loading, profiles } }) => {
  const [name, setName] = useState('');
  useEffect(() => {
    getProfilesByName(name);
  }, [getProfilesByName, name]);
  return (
    <div>
      {loading ? (
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
            {profiles.length > 0 ? (
              profiles.map((profile) => (
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
export default connect(mapStateToProps, { getProfilesByName })(Search);
