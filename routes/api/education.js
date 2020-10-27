const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
// Add Education
router.put(
  '/',
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
    console.log(newEducation);
    try {
      let profile = await Profile.findOne({ user: req.user.id });
      profile.education.unshift(newEducation);
      await profile.save();
      res.json({ msg: 'Education added' });
    } catch (err) {
      console.log(err.message);
      return res.status(400).send('Server Error');
    }
  }
);
// Delete Experience
router.delete('/:edu_id', auth, async (req, res) => {
  try {
    let profile = await Profile.findOne({ user: req.user.id });
    let removeIndex = profile.education
      .map((item) => item.id)
      .indexOf(req.params.edu_id);

    profile.education.splice(removeIndex, 1);
    profile.save();
    res.json({ msg: 'Education deleted' });
  } catch (err) {
    console.log(err.message);
    return res.status(400).send('Server Error');
  }
});
module.exports = router;
