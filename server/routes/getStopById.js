const db = require('../controllers/stop.js');
const app = require('../app.js');
const getStopById = require('express').Router();

getStopById.get('/stop', (req, res) => {
  let query = req.query;

  db.getStopById(query, (err, data) => {
    console.log(query);
    if (err) {
      res.sendStatus(500);
      res.send('Server side error happened');
    } else {
      res.json(data);
      console.log(data);
    }
  });
});

module.exports = getStopById;