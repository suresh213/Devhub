const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Post = require('../../models/Posts');

router.put('/:like_id', auth, async (req, res) => {
  try {
    let post = await Post.findById(req.params.like_id);
    if (!post) {
      return res.status(400).json({ msg: 'No post found' });
    }
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: 'Post already liked' });
    }
    post.likes.unshift({ user: req.user.id });
    await post.save();
    res.json(post.likes);
  } catch (error) {
    console.log(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'No post found' });
    }
  }
});

module.exports = router;
