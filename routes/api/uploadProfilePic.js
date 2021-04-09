const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

router.put('/', auth, async (req, res) => {
  const { image } = req.body;
  if (!image) {
    return res.status(401).json({ msg: 'No image found' });
  }
  const data = {
    avatar: image,
  };
  const user = await User.findOneAndUpdate(
    { _id: req.user.id },
    { $set: data },
    { new: true }
  );
  await user.save();
  return res.status(200).json({ msg: 'Profile picture updated' });
});

module.exports = router;
