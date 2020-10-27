const express = require('express');
const router = express.Router();
const Profile = require('../../models/Profile');

// Get all profiles
router.get('/', async (req, res) => {
  try {
    let profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (err) {
    console.log(err.message);
    return res.status(400).send('Server Error');
  }
});

module.exports = router;
