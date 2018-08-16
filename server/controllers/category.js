const db = require("../../db/models/index.js");

const getAllCategories = (query, callback) => {
  db.Category.findAll({})
    .then(categories => {
      console.log(categories);
      callback(null, categories);
    })
    .catch(err => {
      // Handle any error in the chain
      console.error(err);
      callback(err, null);
    });
};

module.exports = { getAllCategories };
