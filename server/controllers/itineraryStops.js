const db = require('../../db/models/');

const createItineraryStops = (itineraryId, stopId, callback) => {
  console.log('itineraryId, stopId ', itineraryId, stopId);
  db.Itinerary.findOne({ where: { id: itineraryId} })
              .then(itinerary => {
                itinerary.addStops(stopId)
                         .then(res => callback(null, 'success'));
              })
              .catch(err => callback(err, null));
};

module.exports.createItineraryStops = createItineraryStops;