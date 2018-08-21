// This is the file that pass request to db Stop model
const db = require('../../db/models/');

let getItineraryComments = (query, callback) => {
  console.log('controller', query);
  let itineraryId = Number(query.itineraryId);
  db.ItinerariesComment.findAll({    
    where: {
      ItineraryId: itineraryId
    }
  })
  .then((itineraryComments) => {
    console.log(itineraryComments);
    callback(null, itineraryComments);
  })
  .catch((err) => {
    // Handle any error in the chain
    console.error(err);
    callback(err, null);
  });
};

const createItineraryComment = (newItineraryComment, callback) => {
  db.ItinerariesComment.create(newItineraryComment)
    .then(createdItineraryComment => callback(null, createdItineraryComment))
    .catch((err) => {
      console.error(err);
      callback(err, null);
    });
};

module.exports.createItineraryComment = createItineraryComment;
module.exports.getItineraryComments = getItineraryComments;