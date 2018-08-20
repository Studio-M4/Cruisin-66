const db = require('../controllers/itinerariesComment.js');
const app = require('../app.js');
const itineraryComment = require('express').Router();

itineraryComment.post('/itinerarycomments', (req, res) => {
  let newItineraryComment = {
    text: req.body.text || '',
    rating: req.body.rating || '',
    UserId: req.body.UserId,
    ItineraryId: req.body.ItineraryId
  };

  db.createItineraryComment(newItineraryComment, (err, data) => {
    if (err) {
      res.sendStatus(500);
      res.send('Server side error happened');
    } else {
      res.json(data);
      console.log(data);
    }
  });
});

module.exports = itineraryComment;