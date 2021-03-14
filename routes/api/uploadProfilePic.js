const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

router.put('/', auth, async (req, res) => {
  //const { avatar } = req.body;
  console.log(req.files, req.body);
  const data = {
    avatar: req.files,
  };
  console.log(data);
  // const profile = await User.findOneAndUpdate(
  //   { _id: req.user.id },
  //   { $set: avatar },
  //   { new: true }
  // );
  // if (!profile) {
  //   return res.status(401).json({ msg: 'No user found' });
  // }
  // return res.json(profile);
});

module.exports = router;
