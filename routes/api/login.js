const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');


// Login User
router.post(
  '/',
  [
    check('email', 'Enter Email').isEmail(),
    check('password', 'Enter password').not().isEmpty(),
  ],
  async (req, res) => {
    // check isValid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { email, password } = req.body;

      // check user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ msg: 'Invalid Credentials' });
      }
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        return res.status(401).json({ msg: 'Invalid Credentials' });
      }

      // Send token
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).json('Server error');
    }
  }
);

module.exports = router;
