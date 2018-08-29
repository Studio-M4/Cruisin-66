// This file passes requests to db favorites model
const db = require('../../db/models/');

let checkIfLiked = (query, callback) => {
  db.Favorite.findOne({
    where: {
      UserId: query.userId,
      ItineraryId: query.itineraryId
    }
  })
  .then((response) => {
    console.log('response', response);
    callback(null, response);
  })
  .catch((err) => {
    console.log(err);
    callback(err, null);
  });
}
  
module.exports.checkIfLiked = checkIfLiked;