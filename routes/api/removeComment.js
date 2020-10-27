const express = require('express');
const router = express.Router();
const Post = require('../../models/Posts');
const auth = require('../../middleware/auth');

router.delete('/:post_id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    if (!post) {
      return res.status(400).json({ msg: 'No post found' });
    }
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );

    if (
      post.comments.filter(
        (item) => item._id.toString() === req.params.comment_id
      ).length === 0
    ) {
      return res.status(404).json({ msg: 'Comment not found' });
    }
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    const removeIndex = post.comments
      .map((item) => item.id.toString())
      .indexOf(req.params.comment_id);

    post.comments.splice(removeIndex, 1);
    await post.save();
    res.json(post.comments);
  } catch (err) {
    console.log(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'No post found' });
    }
    return res.status(400).json({ msg: 'Server error' });
  }
});

module.exports = router;
