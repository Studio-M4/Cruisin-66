// This is the file that pass request to db Stop model
const db = require('../../db/models/');

let getAllStops = (query, callback) => {
  console.log('controller', query);
  let id = Number(query.itineraryId);
  db.Stop.findAll({
    include: [{
      model: db.Itinerary,     
      where: {
        id: id
      }
    }]
  })
  .then((stops) => {
    console.log(stops);
    callback(null, stops);
  })
  .catch((err) => {
    // Handle any error in the chain
    console.error(err);
    callback(err, null);
  });
};

const getStopById = (query, callback) => {
  db.Stop.findOne({
    where: {
      id: query.id,
    },
  })
  .then((stop) => {
    console.log(stop);
    callback(null, stop);
  })
  .catch((err) => {
    console.error(err);
    callback(err, null);
  });
};

const createStop = (newStop, itineraryId, callback) => {
  console.log('ITINERARY_ID ', itineraryId);
  db.Stop.create(newStop)
    .then(createdStop => createdStop
      .setItineraries([itineraryId])
      .then(() => callback(null, createdStop)))
    .catch((err) => {
      console.error(err);
      callback(err, null);
    });
};

module.exports.createStop = createStop;
module.exports.getAllStops = getAllStops;
module.exports.getStopById = getStopById;
