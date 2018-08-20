const db = require('../controllers/itinerary.js');
const app = require('../app.js');
const getItineraryById = require('express').Router();

getItineraryById.get('/itinerary', (req, res) => {
  let query = req.query;
  
  db.getItineraryById(query, (err, data) => {
    console.log(query);
    if (err) {
      res.sendStatus(500);
      res.send('Server side error happened');
    } else {
      res.json(data);
      console.log(data);
    }
  });
});

module.exports = getItineraryById;