const express = require('express');
const router = express.Router();
const Post = require('../../models/Posts');
const User = require('../../models/User');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

router.post(
  '/',
  [auth, check('text', 'Write some text').not().isEmpty()],
  async (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const user = await User.findById(req.user.id).select('-password');
    try {
      let newPost = new Post({
        user: req.user.id,
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
      });
      await newPost.save();
      res.json(newPost);
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({ msg: 'Server error' });
    }
  }
);

module.exports = router;
