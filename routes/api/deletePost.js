const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Post = require('../../models/Posts');

router.delete('/:post_id', auth, async (req, res) => {
  try {
    let post = await Post.findById(req.params.post_id);
    if (!post) {
        return res.status(400).json({ msg: 'No post found' });
      }
    if (post.user.toString() !== req.user.id) {
      return res.status(400).json({ msg: 'Not Authorized' });
    }
    await post.remove();
    res.json({ msg: 'Post removed' });
  } catch (err) {
    console.log(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'No post found' });
    }
    return res.status(500).send('Server Error');
  }
});

module.exports = router;
