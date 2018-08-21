const db = require('../controllers/itinerariesComment.js');
const app = require('../app.js');
const getItineraryComments = require('express').Router();

getItineraryComments.get('/itinerarycomments', (req, res) => {
  let query = req.query;
  console.log(query);
  db.getItineraryComments(query, (err, data) => {
    if (err) {
      res.sendStatus(500);
      res.send('Server side error happened');
    } else {
      res.json(data);
      console.log(data);
    }
  });
});

module.exports = getItineraryComments;