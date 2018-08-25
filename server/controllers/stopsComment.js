// This is the file that pass request to db stopsComment model
const db = require('../../db/models/');

let getStopComments = (query, callback) => {
  console.log('controller', query);
  let stopId = Number(query.stopId);
  db.StopsComment.findAll({    
    where: {
      StopId: stopId
    }
  })
  .then((stopComments) => {
    console.log(stopComments);
    callback(null, stopComments);
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

