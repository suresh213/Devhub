const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Post = require('../../models/Posts');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');

router.put(
  '/:post_id',
  [auth, check('text', 'Write some comments').not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let user = await User.findById(req.user.id).select('-password');
      const newComment = {
        user: req.user.id,
        name: user.name,
        avatar: user.avatar,
        text: req.body.text,
      };
      // console.log(newComment);
      let post = await Post.findById(req.params.post_id);
      if (!post) {
        return res.status(400).json({ msg: 'No post found' });
      }
      post.comments.unshift(newComment);
      await post.save();
      res.json(newComment);
    } catch (err) {
      console.log(err.message);
      return res.status(400).json({ msg: 'Server error' });
    }
  }
);
module.exports = router;
