const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const { check, validationResult } = require('express-validator');

// create or update profile
router.post(
  '/',
  [
    auth,
    [
      check('status', 'Status is required').not().isEmpty(),
      check('skills', 'Skills are required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const {
        name,
        bio,
        company,
        location,
        website,
        status,
        skills,
        githubusername,
        instagram,
        facebook,
        youtube,
        linkedin,
        twitter,
      } = req.body;

      const profileDetails = {};

      profileDetails.user = req.user.id;
      profileDetails.name = name;
      if (status) profileDetails.status = status;
      if (skills)
        profileDetails.skills = skills.split(',').map((skill) => skill.trim());
      if (bio) profileDetails.bio = bio;
      if (company) profileDetails.company = company;
      if (website) profileDetails.website = website;
      if (location) profileDetails.location = location;
      if (githubusername) profileDetails.githubusername = githubusername;
      if (bio) profileDetails.bio = bio;

      profileDetails.social = {};
      profileDetails.social.youtube = youtube;
      profileDetails.social.twitter = twitter;
      profileDetails.social.linkedin = linkedin;
      profileDetails.social.facebook = facebook;
      profileDetails.social.instagram = instagram;

      console.log(profileDetails);

      //console.log(req.user.id);
      let profile = await Profile.findOne({ user: req.user.id });
      // console.log(profile);

      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileDetails },
          { new: true }
        );
        return res.json(profile);
      }

      profile = new Profile(profileDetails);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.log(err.message);
      return res.status(400).json({ msg: 'Server error' });
    }
  }
);

module.exports = router;
