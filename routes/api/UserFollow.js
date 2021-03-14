const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');

router.put('/:follow_id', auth, async (req, res) => {
  try {
    let user = await User.findById(req.params.follow_id);
    if (!user) {
      return res.status(400).json({ msg: 'No user found' });
    }
    if (
      user.followers.filter((i) => i.user.toString() === req.user.id).length > 0
    ) {
      return res.status(400).json({ msg: 'User already followed' });
    }
    user.followers.unshift(req.user.id);
    await user.save();

    user = await User.findById(req.user.id);
    user.following.unshift(req.params.follow_id);
    await user.save();

    res.json(user.followers);
  } catch (error) {
    console.log(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'No user found' });
    }
    return res.status(500).json('Server error');
  }
});

module.exports = router;
