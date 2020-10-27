const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Post = require('../../models/Posts');

router.delete('/:dislike_id', auth, async (req, res) => {
  try {
    let post = await Post.findById(req.params.dislike_id);
    if (!post) {
      return res.status(400).json({ msg: 'No post found' });
    }
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: 'Post not liked ' });
    }
    let removeIndex = post.likes
      .map((like) => like.user.id.toString())
      .indexOf(req.user.id);
    post.likes.splice(removeIndex, 1);

    await post.save();
    res.json(post.likes);
  } catch (error) {
    console.log(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'No post found' });
    }
    return res.status(500).json('Server error');
  }
});

module.exports = router;
