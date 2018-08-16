const db = require('../controllers/user.js');
const app = require('../app.js');
const login = require('express').Router();
const util = require('../utilities/helps.js');

login.post('/login', (req, res) => {
  let query = {
    email: req.body.email,
    password: req.body.password
  };

  db.login(query, (err, data) => {
    console.log(query);
    if (err) {
      res.sendStatus(500);
      res.send('Server side error happened');
    } else {
      if (data.messageCode === 102 || data.messageCode === 103) {
        res.json(data);
      } else {
        // send something to indicate session state change
        util.createSession(req, res, data);
      }
    }
  });
});

module.exports = login;