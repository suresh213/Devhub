const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const { check, validationResult } = require('express-validator');

// Add Experience
router.put(
  '/create',
  [
    auth,
    check('titile', 'Title is required').not().isEmpty(),
    check('from', 'from is required').not().isEmpty(),
    check('company', 'company is required').not().isEmpty(),
  ],
  async (req, res) => {
    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    } = req.body;

    const newExperience = {};
    newExperience.title = title;
    newExperience.company = company;
    newExperience.from = from;
    if (to) newExperience.to = to;
    if (location) newExperience.location = location;
    newExperience.current = current;
    if (description) newExperience.description = description;

    try {
      let profile = await Profile.findOne({ user: req.user.id });
      profile.experience.unshift(newExperience);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.log(err.message);
      return res.status(400).send('Server Error');
    }
  }
);
// Delete Experience
router.delete('/:exp_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    const expIds = profile.experience.map((exp) => exp._id.toString());
    const removeIndex = expIds.indexOf(req.params.exp_id);
    console.log(removeIndex);
    if (removeIndex === -1) {
      return res.status(500).json({ msg: 'Server error' });
    } else {
      profile.experience.splice(removeIndex, 1);
      await profile.save();
      res.json(profile);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
