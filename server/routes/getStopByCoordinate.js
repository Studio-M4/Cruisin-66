const stop = require('express').Router();
const db = require('../controllers/stop.js');


stop.get('/stop/coordinate/:lng/:lat', (req, res) => {
  const { lng, lat } = req.params;
  const coordinate = { longitude: lng, latitude: lat };

  db.getStopByCoordinate(coordinate, (err, data) => {
    if (err) {
      res.status(500).send('Server side error happened');
    } else {
      res.status(200).json(data);
    }
  });
});

module.exports = stop;
