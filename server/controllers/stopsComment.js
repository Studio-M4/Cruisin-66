// This is the file that pass request to db stopsComment model
const db = require('../../db/models/');

let getStopComments = (query, callback) => {
  console.log('controller', query);
  let stopId = Number(query.stopId);
  db.StopsComment.findAll({    
    where: {
      StopId: stopId
    },
    include: [db.User]
  })
  .then((stopComments) => {
    console.log(stopComments);
    let commentsWithoutPassword = stopComments.map((stopComment) => {
      return {
        id: stopComment.id,
        text: stopComment.text,
        rating: stopComment.rating,
        createdAt: stopComment.createdAt,
        updatedAt: stopComment.updatedAt,
        StopId: stopComment.StopId,
        User: {
          id: stopComment.User.id,
          userName: stopComment.User.userName,
          firstName: stopComment.User.firstName,
          lastName: stopComment.User.lastName,
          email: stopComment.User.email,
          photoAvatar: stopComment.User.photoAvatar,
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

const createStopComment = (newStopComment, callback) => {
  db.StopsComment.create(newStopComment)
    .then(createdStopComment => callback(null, createdStopComment))
    .catch((err) => {
      console.error(err);
      callback(err, null);
    });
};

module.exports.createStopComment = createStopComment;
module.exports.getStopComments = getStopComments;
