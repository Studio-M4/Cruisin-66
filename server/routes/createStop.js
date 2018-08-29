const stop = require('express').Router();
const db = require('../controllers/stop.js');


stop.post('/stop', (req, res) => {
  const { itineraryId, stop, order } = req.body;

  db.createStop(stop, itineraryId, order, (err, data) => {
    if (err) {
      res.status(500).send('Server side error happened');
    } else {
      console.log('stopsBeforeJson', data);
      res.json(data);
      console.log('stops', data);
    }
  });
});

module.exports = stop;
