// This is the file that pass request to db Stop model
const db = require('../../db/models/');

let getItineraryComments = (query, callback) => {
  console.log('controller', query);
  let itineraryId = Number(query.itineraryId);
  db.ItinerariesComment.findAll({
    where: {
      ItineraryId: itineraryId
    }, include: [db.User]
  })
  .then((itineraryComments) => {
    console.log(itineraryComments);
    let commentsWithoutPassword = itineraryComments.map((itineraryComment) => {
      return {
        id: itineraryComment.id,
        text: itineraryComment.text,
        rating: itineraryComment.rating,
        createdAt: itineraryComment.createdAt,
        updatedAt: itineraryComment.updatedAt,
        ItineraryId: itineraryComment.ItineraryId,
        User: {
          id: itineraryComment.User.id,
          userName: itineraryComment.User.userName,
          firstName: itineraryComment.User.firstName,
          lastName: itineraryComment.User.lastName,
          email: itineraryComment.User.email,
          photoAvatar: itineraryComment.User.photoAvatar,
        }
      }
    });
    callback(null, commentsWithoutPassword);
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