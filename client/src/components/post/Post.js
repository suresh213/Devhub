import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { getPostById } from '../../actions/post';
import { connect } from 'react-redux';
import CommentItem from '../post/CommentItem';
import CommentForm from '../post/CommentForm';
import Spinner from '../layouts/Spinner';
import PostItem from '../posts/PostItem';

const Post = ({ getPostById, post: { post, loading }, match }) => {
  const [comments, setComments] = useState({});
  useEffect(() => {
    getPostById(match.params.id);
    if (post && post.comments) {
      setComments(post.comments);
    }
  }, [getPostById, post]);

  if (loading || post === null) {
    return <Spinner />;
  }
  return (
    <Fragment>
      <Link to='/posts' className='btn btn-light'>
        Back to Posts
      </Link>
      <PostItem post={post} showActions={false} />
      <CommentForm postId={post._id} />
      <div className='comments'>
        {post ? (
          comments.length > 0 ? (
            comments.map((comment) => (
              <CommentItem
                key={comment._id}
                comment={comment}
                postId={post._id}
              />
            ))
          ) : (
            <p>No comments</p>
          )
        ) : (
          <Spinner />
        )}
      </div>
    </Fragment>
  );
};

Post.propTypes = {
  getPostById: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});
export default connect(mapStateToProps, { getPostById })(Post);
