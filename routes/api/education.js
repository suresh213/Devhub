const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
// Add Education
router.put(
  '/create',
  [
    auth,
    check('school', 'School is required').not().isEmpty(),
    check('degree', 'Degree is required').not().isEmpty(),
    check('fieldofstudy', 'Field of Study is required').not().isEmpty(),
    check('from', 'From is required').not().isEmpty(),
  ],
  async (req, res) => {
    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    } = req.body;

    const newEducation = {};
    newEducation.school = school;
    newEducation.degree = degree;
    newEducation.fieldofstudy = fieldofstudy;
    newEducation.from = from;
    if (to) newEducation.to = to;
    if (current) newEducation.current = current;
    if (description) newEducation.description = description;
    // console.log(newEducation);
    try {
      let profile = await Profile.findOne({ user: req.user.id });
      profile.education.unshift(newEducation);
      await profile.save();
      return res.json(profile);
    } catch (err) {
      console.log(err.message);
      return res.status(500).send('Server Error');
    }
  }
);
// Delete Education
router.delete('/:edu_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    const eduIds = profile.education.map((edu) => edu._id.toString());
    const removeIndex = eduIds.indexOf(req.params.edu_id);
    // console.log(removeIndex);
    if (removeIndex === -1) {
      return res.status(500).json({ msg: 'Server error' });
    } else {
      profile.education.splice(removeIndex, 1);
      await profile.save();
      res.json(profile);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Server error' });
  }
});
module.exports = router;
