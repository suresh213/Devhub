const express = require('express');
const router = express.Router();
const Profile = require('../../models/Profile');

// Get profile by id
router.get('/:user_id', async (req, res) => {
  try {
    // console.log(req.params.user_id);
    let profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate('user', ['name', 'avatar']);
    if (!profile) {
      return res.status(400).json({ msg: 'No profile found' });
    }
    res.json(profile);
  } catch (err) {
    console.log(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'No profile found' });
    }
    res.status(500).send('Server Error');
  }
});
module.exports = router;
