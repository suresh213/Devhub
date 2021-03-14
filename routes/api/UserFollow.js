const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');

router.put('/:id', auth, async (req, res) => {
  try {
    console.log(req.params.id);
    let user = await User.findById(req.params.id);
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
    user.following.unshift(req.params.id);
    await user.save();
    const result = {
      user1: req.params.id,
      user2: req.user.id,
      followers: user.followers,
      following: user.following,
    };
    res.json(result);
  } catch (error) {
    console.log(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'No user found' });
    }
    return res.status(500).json('Server error');
  }
});
router.delete('/:id', auth, async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    if (!user) {
      return res.status(400).json({ msg: 'No user found' });
    }
    // if (
    //   user.followers.filter((i) => i.user.toString() === req.user.id).length > 0
    // ) {
    //   return res.status(400).json({ msg: 'User already followed' });
    // }
    let removeIndex = user.followers
      .map((i) => i.toString())
      .indexOf(req.user.id);
    console.log(removeIndex);
    user.followers.splice(removeIndex, 1);
    await user.save();

    user = await User.findById(req.user.id);
    removeIndex = user.followers
      .map((i) => i.toString())
      .indexOf(req.params.id);
    user.following.splice(removeIndex, 1);
    await user.save();
    const result = {
      user1: req.params.id,
      user2: req.user.id,
      followers: user.followers,
      following: user.following,
    };
    res.json(result);
  } catch (err) {
    console.log(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'No user found' });
    }
    return res.status(500).json('Server error');
  }
});
module.exports = router;
