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
    } catch (err) {}
  }
);
// Delete Experience
router.delete('/:exp_id', auth, async (req, res) => {
  try {
    let profile = await Profile.findOne({ user: req.user.id });
    let removeIndex = profile.experience
      .map((item) => item.id)
      .indexOf(req.params.exp_id);
    console.log(removeIndex);
    profile.experience.splice(removeIndex, 1);
    await profile.save();
    res.json({ msg: 'Experience deleted' });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error');
  }
});

module.exports = router;
