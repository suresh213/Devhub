import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { UPDATE_FOLLOWERS, UPDATE_FOLLOWING } from '../../actions/types';
import axios from 'axios';
import { toast } from 'react-toastify';
const ProfileItem = ({
  profile: {
    user: { _id, name, avatar, followers },
    status,
    company,
    location,
    skills,
  },
  auth: { user },
}) => {
  const [isFollowed, setIsFollowed] = useState(false);
  useEffect(() => {
    if (user) {
      let followed = followers.includes(user._id);
      if (followed) {
        setIsFollowed(true);
      }
      console.log(isFollowed);
    }
  }, [followers]);

  const followUser = (id) => {
    console.log(id);
    axios
      .put(`/api/user/follow/${id}`)
      .then((res) => {
        console.log(res);
        setIsFollowed(true); // dispatch({
        //   type: UPDATE_FOLLOWERS,
        //   payload: { id, likes: res.data },
        // });
        // dispatch({
        //   type: UPDATE_FOLLOWING,
        //   payload: { id, likes: res.data },
        // });
      })
      .catch((err) => {
        console.log(err);
        // dispatch({
        //   type: UPDATE_FOLLOWERS,
        //   payload: { msg: err.response.statusText, status: err.response.status },
        // });
      });
  };
  const unFollowUser = (id) => {
    axios
      .delete(`/api/user/unfollow/${id}`)
      .then((res) => {
        console.log(res);
        setIsFollowed(false); // dispatch({
        //   type: UPDATE_FOLLOWERS,
        //   payload: { id, likes: res.data },
        // });
        // dispatch({
        //   type: UPDATE_FOLLOWING,
        //   payload: { id, likes: res.data },
        // });
      })
      .catch((err) => {
        console.log(err);
        // dispatch({
        //   type: UPDATE_FOLLOWERS,
        //   payload: { msg: err.response.statusText, status: err.response.status },
        // });
      });
  };
  const handleFollow = () => {
    if (isFollowed) {
      unFollowUser(_id);
    } else {
      followUser(_id);
    }
  };
  return (
    <div className='profile-item bg-light'>
      <Link to={`/profile/${_id}`}>
        <div>
          <img src={avatar} alt='avatar' className='round-img' />
          <h2>{name}</h2>
          <p>
            {status}
            {company && <span> at {company} </span>}
          </p>
          {/* <p className='my-1'>{location && <span>{location}</span>}</p> */}
        </div>
      </Link>

      {/* <ul>
        {skills.splice(0, 4).map((skill, index) => (
          <li key={index} className='text-primary'>
            <i className=' fa fa-arrow-right'></i> {skill}
          </li>
        ))}
      </ul> */}
      {_id !== user._id && (
        <button
          onClick={handleFollow}
          type='button'
          className={isFollowed ? 'btn btn-dark ' : 'btn btn-light'}
        >
          {isFollowed ? 'Unfollow' : 'Follow'}
        </button>
      )}
    </div>
  );
};
ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(ProfileItem);
