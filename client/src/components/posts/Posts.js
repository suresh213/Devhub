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
    // axios
    //   .get('/api/posts/allPosts')
    //   .then((res) => {
    //     dispatch({
    //       type: GET_POSTS,
    //       payload: res.data,
    //     });
    //   })
    //   .catch((err) => {
    //     dispatch({
    //       type: POST_ERROR,
    //       payload: {
    //         msg: err.response.statusText,
    //         status: err.response.status,
    //       },
    //     });
    //   });
  }, [getAllPosts]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className='post-page'>
        <div className='connect-people'></div>
        <div className='all-posts'>
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
