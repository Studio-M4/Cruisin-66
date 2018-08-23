// This file passes requests to db favorites model
const db = require('../../db/models/');


let addFavorite = (userId, itineraryId, callback) => {
    console.log('USER_ID ', userId);
    console.log('ITINERARY_ID ', itineraryId);
    
    db.Favorite.create({
      UserId: userId,
      ItineraryId: itineraryId
    })
    .then((addedFavorite) => {
      console.log(addedFavorite);
      callback(null, addedFavorite);
    })
    .catch((err) => {
      console.error(err);
      callback(err, null);
    })
  }
  
  module.exports.addFavorite = addFavorite;