const db = require('../controllers/itinerary.js');
const app = require('../app.js');
const itinerary = require('express').Router();

itinerary.post('/itinerary', (req, res) => {
  let newItinerary = {
    name: req.body.name || '',
    description: req.body.description || '',
    userId: req.body.userId || 8
  };

  db.createItinerary(newItinerary, (err, data) => {
    if (err) {
      res.sendStatus(500);
      res.send('Server side error happened');
    } else {
      res.json(data);
      console.log(data);
    }
  });
});

module.exports = itinerary;