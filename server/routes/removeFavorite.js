const favorite = require('express').Router();
const db = require('../controllers/favorite.js');

favorite.delete('/favorite', (req, res) => {
    const itineraryId = req.query.itineraryId;
    const userId = req.query.userId;

    console.log('line 8 reqquery', req.query)
  
    db.removeFavorite(userId, itineraryId, (err, resp) => {
      if (err) {
        res.status(500).send('Server side error happened');
      } else {
        console.log('successfully deleted', resp);
        res.status(200).send('successfully deleted')
      }
    });
  });
  
  module.exports = favorite;