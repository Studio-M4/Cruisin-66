const db = require('../controllers/user.js');
const app = require('../app.js');
const signup = require('express').Router();
const util = require('../utilities/helps.js');

signup.post('/signup', (req, res) => {
  let newUser = {
    firstName: req.body.firstName || '',
    lastName: req.body.lastName || '',
    userName: req.body.userName || '',
    email: req.body.email || '',
    password: req.body.password || '',
    photoAvatar: req.body.photoAvatar || ''
  };

  db.createNewUser(newUser, (err, data) => {
    console.log(newUser);
    if (err) {
      res.sendStatus(500);
      res.send('Server side error happened');
    } else {
      if (data.messageCode === 101) {
        res.json(data);
      } else {
        util.createSession(req, res, data);
      }
    }
  });
});

module.exports = signup;

