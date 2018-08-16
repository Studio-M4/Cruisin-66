const stop = require('express').Router();
const db = require('../controllers/stop.js');


stop.post('/stop', (req, res) => {
  const { itineraryId } = req.body;
  const newStop = {
    name: req.body.name || '',
    description: req.body.description || '',
    address: req.body.address || '',
    userId: req.body.userId || 8,
  };

  db.createStop(newStop, itineraryId, (err, data) => {
    if (err) {
      res.sendStatus(500);
      res.send('Server side error happened');
    } else {
      res.json(data);
      console.log(data);
    }
  });
});

module.exports = stop;
