const express = require('express');
const router = express.Router();
const Post = require('../../models/Posts');

// Get post by id
router.get('/:post_id', async (req, res) => {
  try {
    // console.log(req.params.post_id);
    let post = await Post.findById(req.params.post_id);
    if (!post) {
      return res.status(400).json({ msg: 'No post found' });
    }
    res.json(post);
  } catch (err) {
    console.log(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'No post found' });
    }
    res.status(500).send('Server Error');
  }
});
module.exports = router;
