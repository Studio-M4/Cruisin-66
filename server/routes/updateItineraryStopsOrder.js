const updateItineraryStopsOrder = require('express').Router();
const db = require('../controllers/itineraryStops.js');


updateItineraryStopsOrder.put('/itinerarystops/order', (req, res) => {
  const { stopsIdsByOrder, itineraryId } = req.body;

  db.updateItineraryStopsOrder(stopsIdsByOrder, itineraryId, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

module.exports = updateItineraryStopsOrder;
