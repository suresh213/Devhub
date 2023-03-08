const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");
const gravatar = require("gravatar");
const auth = require("../../middleware/auth");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

// const { connect } = require("getstream");
// const StreamChat = require("stream-chat").StreamChat;
const crypto = require("crypto");

const api_key = "pm4bsbbnrdtr";
const api_secret =
  "29vrb46fmzj3ydfnqxacp463ah6mvzteu376na5mjuknn85ebwem6nheehfh9wep";
const app_id = "1196085";

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
  //res.send('Auth');
});

// Register User
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Email is required").isEmail(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
      // Check user exists
      let user = await User.findOne({ email });
      //console.log(user);
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }
      const avatar = "http://www.gravatar.com/avatar/?d=mp";
      // Create instance for DB
      user = new User({
        name,
        email,
        password,
        avatar,
      });

      // Hash Password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      // Save User in DB
      const result = await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };
      // const serverClient = connect(api_key, api_secret, app_id);
      // console.log(serverClient);
      // const userId = crypto.randomBytes(16).toString("hex");
      // const chatToken = serverClient.createUserToken(userId);

      jwt.sign(
        payload,
        process.env.jwtSecret,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token, ...result._doc });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
