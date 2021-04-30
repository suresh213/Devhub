const express = require('express');
const router = express.Router();
const config = require('config');
const request = require('request');

//Get repositories
router.get('/:username', (req, res) => {
  console.log(req.params.username);
  try {
    const options = {
      uri: `http://api.github.com/users/${
        req.params.username
      }/repos?per_page=5&sort=created:asc&client_id=${config.get(
        'githubClientId'
      )}&client_secret=${config.get('githubSecret')}`,
      method: 'GET',
      headers: { 'user-agent': 'node.js' },
    };
    // console.log(options.uri);
    request(options, (error, response, body) => {
      if (error) console.error(error);
      // console.log(response.statusCode);
      if (response.statusCode !== 200) {
        return res.status(404).json({ msg: 'No Github Profile found' });
      }
      console.log(JSON.parse(body));
      res.json(JSON.parse(body));
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error');
  }
});

module.exports = router;
