'use strict';
module.exports = (Sequelize, type) => {
  var ItinerariesComment = Sequelize.define('ItinerariesComment', {
    text: type.STRING,
    rating: type.FLOAT
  });

  ItinerariesComment.associate = function(models) {
    // Itinerary.belongsTo(models.Category)
    // Itinerary.hasMany(models.Favorite)
  };

  return ItinerariesComment;
};

