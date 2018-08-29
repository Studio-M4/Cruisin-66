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

const updateItineraryStopsOrder = (stopsIdsByOrder, itineraryId, callback) => {
  try {
    stopsIdsByOrder.forEach((stopId, index) => {
      const order = index + 1;
      db.ItineraryStops.update({ order }, { where: { StopId: stopId, ItineraryId: itineraryId } });
    });
    callback(null, 'update successfully');
  } catch(err) {
    callback(err, null);
  }
};

module.exports.createItineraryStops = createItineraryStops;
module.exports.updateItineraryStopsOrder = updateItineraryStopsOrder;