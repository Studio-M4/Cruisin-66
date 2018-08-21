const db = require('../controllers/stopsComment.js');
const app = require('../app.js');
const getStopComments = require('express').Router();

getStopComments.get('/stopcomments', (req, res) => {
  let query = req.query;
  console.log(query);
  db.getStopComments(query, (err, data) => {
    if (err) {
      res.sendStatus(500);
      res.send('Server side error happened');
    } else {
      res.json(data);
      console.log(data);
    }
  });
});

module.exports = getStopComments;