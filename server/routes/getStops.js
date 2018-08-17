const db = require('../controllers/stop.js');
const app = require('../app.js');
const getStops = require('express').Router();

getStops.get('/stops', (req, res) => {
  let query = req.query;
  console.log(query);
  db.getAllStops(query, (err, data) => {
    if (err) {
      res.sendStatus(500);
      res.send('Server side error happened');
    } else {
      res.json(data);
      console.log(data);
    }
  });
});

module.exports = getStops;