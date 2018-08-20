const db = require('../controllers/itinerary.js');
const app = require('../app.js');
const getItinerariesByUserId = require('express').Router();

getItinerariesByUserId.get('/profile/itineraries', (req, res) => {
  let query = req.query;
  db.getItinerariesByUserId(query, (err, data) => {
    if (err) {
      res.sendStatus(500);
      res.send('Server side error happened');
    } else {
      res.json(data);
      console.log(data);
    }
  });
});

module.exports = getItinerariesByUserId;