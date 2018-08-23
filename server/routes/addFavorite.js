const favorite = require('express').Router();
const db = require('../controllers/favorite.js');

favorite.post('/favorite', (req, res) => {
    const itineraryId = req.body.itineraryId;
    const userId = req.body.userId;

    console.log('request body line 8', req.body)
  
    db.addFavorite(userId, itineraryId, (err, data) => {
      if (err) {
        res.status(500).send('Server side error happened');
      } else {
        console.log('favoriteBeforeJson', data);
        res.json(data);
        console.log('favorite', data);
      }
    });
  });
  
  module.exports = favorite;