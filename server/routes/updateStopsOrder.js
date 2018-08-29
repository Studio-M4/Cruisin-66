const updateStopsOrder = require('express').Router();
const db = require('../controllers/stop.js');


updateStopsOrder.put('/stops/order', (req, res) => {
  const { idsByOrder } = req.body;

  db.updateStopsOrder(idsByOrder, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

module.exports = updateStopsOrder;
