const db = require('../controllers/itinerary.js');
const app = require('../app.js');
const getItineraryById = require('express').Router();

getItineraryById.get('/itinerary', (req, res) => {
  console.log(req.params);
  let query = req.params;
  
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