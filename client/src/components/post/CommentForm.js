import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { addComment } from '../../actions/post';
import { connect } from 'react-redux';

const CommentForm = ({ postId, addComment }) => {
  const [text, setText] = useState('');

  return (
    <div className='post-form'>
      <div>
        <h3>Comments</h3>
      </div>
      <form
        className='form my-1'
        onSubmit={(e) => {
          e.preventDefault();
          addComment({ text }, postId);
          setText('');
        }}
      >
        <textarea
          onChange={(e) => setText(e.target.value)}
          name='text'
          cols='30'
          rows='5'
          value={text}
          placeholder='Add a comment'
          required
        ></textarea>
        <input
          type='submit'
          className='btn btn-dark my-1 w-20'
          value='Submit'
        />
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default connect(null, { addComment })(CommentForm);
