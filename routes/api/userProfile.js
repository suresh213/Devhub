const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

router.get('/', auth, async (req, res) => {
  const profile = await Profile.findOne({ user: req.user.id }).populate(
    'user',
    ['name', 'avatar']
  );
  if (!profile) {
    return res.status(401).json({ msg: 'No profile found' });
  }
  res.json(profile);
});

module.exports = router;
