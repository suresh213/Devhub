import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getAllPosts } from '../../actions/post';
import { connect } from 'react-redux';
import PostItem from './PostItem';
import PostForm from './PostForm';
import Spinner from '../layouts/Spinner';

const Posts = ({ getAllPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className='form-container1'>
        <PostForm />
        <h3>All Posts</h3>
        {posts ? (
          <div className='posts'>
            {posts.map((post) => (
              <PostItem key={post._id} post={post} />
            ))}
          </div>
        ) : (
          <h3>No posts Found</h3>
        )}
      </div>
    </Fragment>
  );
};

Posts.propTypes = {
  getAllPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});
export default connect(mapStateToProps, { getAllPosts })(Posts);
