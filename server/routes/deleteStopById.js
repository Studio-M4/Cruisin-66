const deleteStop = require('express').Router();
const db = require('../controllers/stop.js');

deleteStop.delete('/stop', (req, res) => {
  let query = req.query;
  
  db.deleteStopById(query, (err, resp) => {
    if (err) {
      res.status(500).send('Server side error happened');
    } else {
      console.log('successfully deleted', resp);
      res.status(200).send('successfully deleted')
    }
  });
});

module.exports = deleteStop;