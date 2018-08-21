const db = require('../controllers/stopsComment.js');
const app = require('../app.js');
const stopComment = require('express').Router();

stopComment.post('/stopcomments', (req, res) => {
  let newStopComment = {
    text: req.body.text || '',
    rating: req.body.rating || '',
    UserId: req.body.UserId,
    StopId: req.body.StopId
  };

  db.createStopComment(newStopComment, (err, data) => {
    if (err) {
      res.sendStatus(500);
      res.send('Server side error happened');
    } else {
      res.json(data);
      console.log(data);
    }
  });
});

module.exports = stopComment;