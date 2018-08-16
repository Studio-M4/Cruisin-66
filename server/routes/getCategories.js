const getCategories = require('express').Router();
const db = require('../controllers/category.js');

getCategories.get('/categories', (req, res) => {
  console.log(req.query);

  db.getAllCategories(req.query, (err, data) => {
    if (err) {
      console.log('Error messages: ', err);
      res.status(500).send('Server side error happened.');
    } else {
      res.status(200).send(data);
    }
  });
});

module.exports = getCategories;
