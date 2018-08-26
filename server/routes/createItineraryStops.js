const ItineraryStops = require('express').Router();
const db = require('../controllers/itineraryStops.js');

ItineraryStops.post('/itinerarystops', (req, res) => {
  const { itineraryId, stopId } = req.body;
    db.createItineraryStops(itineraryId, stopId, (err, data) => {
      if (err) {
        res.status(500).send('Server side error happened');
      } else {
        res.status(201).json(data);
      }
    });
  });
  
  module.exports = ItineraryStops;