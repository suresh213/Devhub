import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { followUser, unFollowUser } from '../../actions/user';
const ProfileItem = ({
  profile: {
    user: { _id, name, avatar, followers },
    status,
    company,
    location,
    skills,
  },
  auth,
}) => {
  const [isFollowed, setIsFollowed] = useState(false);
  useEffect(() => {
    if (auth.user) {
      let Followed = followers.filter((item) => item === auth.user._id);
      if (Followed.length > 0) {
        setIsFollowed(true);
      }
      console.log(isFollowed);
    }
  }, [followers]);
  const handleFollow = () => {
    if (isFollowed) {
      setIsFollowed(false);
      unFollowUser(_id);
    } else {
      setIsFollowed(true);
      followUser(_id);
    }
  };
  return (
    <div className='profile bg-light'>
      <img src={avatar} alt='avatar' className='round-img' />
      <div>
        <h2>{name}</h2>
        <p>
          {status}
          {company && <span> at {company} </span>}
        </p>
        <p className='my-1'>{location && <span>{location}</span>}</p>
        <Link to={`/profile/${_id}`} className='btn btn-primary'>
          View Profile
        </Link>
      </div>

      <ul>
        {skills.splice(0, 4).map((skill, index) => (
          <li key={index} className='text-primary'>
            <i className=' fa fa-arrow-right'></i> {skill}
          </li>
        ))}
      </ul>
      <button
        onClick={handleFollow}
        type='button'
        className={isFollowed ? 'btn btn-dark ' : 'btn btn-light'}
      >
        {isFollowed ? 'Unfollow' : 'Follow'}
      </button>
    </div>
  );
};
ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { followUser, unFollowUser })(
  ProfileItem
);
