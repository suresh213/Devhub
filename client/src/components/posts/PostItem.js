import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { addLike, removeLike, deletePost } from '../../actions/post';
const PostItem = ({
  auth,
  addLike,
  removeLike,
  deletePost,
  post: { _id, text, date, name, avatar, likes, comments, user },
  showActions,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  useEffect(() => {
    if (auth.user) {
      let liked = likes.filter((like) => like.user === auth.user._id);
      if (liked.length > 0) {
        setIsLiked(true);
      }
    }
  }, [likes]);
  const handleLikes = () => {
    if (isLiked) {
      setIsLiked(false);
      removeLike(_id);
    } else {
      setIsLiked(true);
      addLike(_id);
    }
  };
  return (
    <div className='post bg-white p-1 my-1'>
      <div className='post-head'>
        <Link to={`/profile/${user}`} className='post-head-name'>
          <img className='round-img' src={avatar} alt='' />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className='my-1'>{text}</p>
        <p className='post-date'>
          Posted <Moment format='YYYY/MM/DD'>{date}</Moment>
        </p>

        {showActions && (
          <Fragment>
            <button
              onClick={handleLikes}
              type='button'
              className={isLiked ? 'btn btn-dark ' : 'btn btn-light'}
            >
              <i className='fas fa-thumbs-up'></i> <span>{likes.length}</span>
            </button>
            {/* <button
              onClick={(e) => removeLike(_id)}
              type='button'
              className='btn btn-light'
            >
              <i className='fas fa-thumbs-down'></i>
            </button> */}
            <Link to={`posts/${_id}`} className='btn btn-primary'>
              Discussion{' '}
              <span className='comment-count'>{comments.length}</span>
            </Link>
            {!auth.loading && user === auth.user._id && (
              <button
                onClick={(e) => deletePost(_id)}
                type='button'
                className='btn btn-danger'
              >
                <i className='fas fa-times'></i>
              </button>
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
};

PostItem.defaultProps = {
  showActions: true,
};
PostItem.propTypes = {
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  showActions: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItem
);
