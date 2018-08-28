const db = require('../controllers/itinerary.js');
const app = require('../app.js');
const itinerary = require('express').Router();

itinerary.post('/itinerary', (req, res) => {
  let newItinerary = {
    name: req.body.name || '',
    description: req.body.description || '',
    UserId: req.body.UserId,
    CategoryId: req.body.CategoryId,
    photoUrl: req.body.photoUrl
  };

  db.createItinerary(newItinerary, (err, data) => {
    console.log(newItinerary);
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