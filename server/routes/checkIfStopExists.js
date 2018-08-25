const checkStop = require('express').Router();
const db = require('../controllers/stop.js');


checkStop.get('/checkStop/:lng/:lat', (req, res) => {
  const { lng, lat } = req.params;
  const coordinate = { longitude: lng, latitude: lat };

  db.checkIfStopExists(coordinate, (err, data) => {
    if (err) {
      res.status(500).send('Server side error happened');
    } else {
      res.status(200).json(data);
    }
  });
});

module.exports = checkStop;
