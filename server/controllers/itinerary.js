const db = require('../../db/models/');

let getAllItineraries = (callback) => {
  db.Itinerary.findAll() 
  .then((itineraries) => {
    console.log(itineraries);    
    callback(null, itineraries);
  })
  .catch((err) => {
    // Handle any error in the chain
    console.error(err);
    callback(err, null);
  });
}

let getItineraryById = (query, callback) => {
  db.Itinerary.findOne({
    where: {
      id: query.id
    }
  })
  .then((itinerary) => {
    console.log(itinerary);
    callback(null, itinerary);
  })
  .catch((err) => {
    console.error(err);
    callback(err, null);
  })
}

let getItinerariesByUserId = (query, callback) => {
  db.Itinerary.findAll({
    where: {
      UserId: query.UserId
    }
  })
  .then((itineraries) => {
    console.log(itineraries);
    callback(null, itineraries);
  })
  .catch((err) => {
    console.error(err);
    callback(err, null);
  })
}

let createItinerary = (newItineray, callback) => {
  console.log('newItineray', newItineray);
  
  db.Itinerary.create({
    name: newItineray.name,
    description: newItineray.description,
    UserId: newItineray.UserId,
    CategoryId: newItineray.CategoryId
  })
  .then((createdItinerary) => {
    console.log(createdItinerary);
    callback(null, createdItinerary);
  })
  .catch((err) => {
    console.error(err);
    callback(err, null);
  })
}

module.exports.createItinerary = createItinerary;
module.exports.getAllItineraries = getAllItineraries;
module.exports.getItineraryById = getItineraryById;
module.exports.getItinerariesByUserId = getItinerariesByUserId;