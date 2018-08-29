const heart = require('express').Router();
const db = require('../controllers/heart.js');

heart.get('/heart', (req, res) => {
  let query = req.query;

  db.checkIfLiked(query, (err, data) => {
    if (err) {
      res.sendStatus(500);
      res.send('Server side error happened');
    } else {
      res.json(data);
      console.log(data);
    }
  });
});

module.exports = heart;