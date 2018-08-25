const db = require('../controllers/favorite.js');
const getFavorites = require('express').Router();

getFavorites.get('/favorite', (req, res) => {
  let query = req.query;
  db.getFavorites(query, (err, data) => {
    if (err) {
      res.sendStatus(500);
      res.send('Server side error happened');
    } else {
      res.json(data);
      console.log(data);
    }
  });
});

module.exports = getFavorites;