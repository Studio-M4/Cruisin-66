const db = require('../../db/models/');

let getAllItineraries = (callback) => {
  db.Itinerary.findAll({
    include: [{
      model: db.User
    }]
  }) 
  .then((itineraries) => {
    console.log(itineraries);
    let itinerariesWithoutPassword = itineraries.map((itinerary) => {
      return {
        id: itinerary.id,
        name: itinerary.name,
        description: itinerary.description,
        photoUrl: itinerary.photoUrl,
        createdAt: itinerary.createdAt,
        updatedAt: itinerary.updatedAt,
        CategoryId: itinerary.CategoryId,
        User: {
          id: itinerary.User.id,
          userName: itinerary.User.userName,
          firstName: itinerary.User.firstName,
          lastName: itinerary.User.lastName,
          email: itinerary.User.email,
          photoAvatar: itinerary.User.photoAvatar,
        }
      }
    })   
    callback(null, itinerariesWithoutPassword);
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