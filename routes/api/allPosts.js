const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const auth = require('../../middleware/auth');
const Post = require('../../models/Posts');

router.get('/', auth, async (req, res) => {
  try {
    let posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.log(err.message);
    return res.status(400).json({ msg: 'Server error' });
  }
});

module.exports = router;
