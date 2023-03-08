const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { connect } = require("getstream");
const StreamChat = require("stream-chat").StreamChat;
const crypto = require("crypto");

const api_key = "pm4bsbbnrdtr";
const api_secret =
  "29vrb46fmzj3ydfnqxacp463ah6mvzteu376na5mjuknn85ebwem6nheehfh9wep";
const app_id = "1196085";

// Login User
router.post(
  "/",
  [
    check("email", "Enter Email").isEmail(),
    check("password", "Enter password").not().isEmpty(),
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
        return res.status(401).json({ msg: "Email not exists" });
      }
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        return res.status(401).json({ msg: "Invalid Credentials" });
      }

      // Send token
      const payload = {
        user: {
          id: user.id,
        },
      };

      const serverClient = connect(api_key, api_secret, app_id);
      const client = StreamChat.getInstance(api_key, api_secret);

      const { users } = await client.queryUsers({email});

      if (!users.length)
        return res.status(400).json({ message: "User not found" });

      const chatToken = serverClient.createUserToken(users[0].id);

      jwt.sign(
        payload,
        process.env.jwtSecret,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token, chatToken, ...user });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).json("Server error");
    }
  }
);

module.exports = router;
