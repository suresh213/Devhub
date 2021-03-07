const express = require('express');
const router = express.Router();
const Profile = require('../../models/Profile');
const User = require('../../models/User');

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

router.get('/profilesByName/:name', async (req, res) => {
  try {
    console.log(req.params.name);
    let profiles = await Profile.find({
      name: req.params.name,
    }).populate('user', ['name', 'avatar']);
    console.log(profiles);
    res.json(profiles);
  } catch (err) {
    console.log(err.message);
    return res.status(400).send('Server Error');
  }
});

module.exports = router;
