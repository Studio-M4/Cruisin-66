'use strict';
module.exports = (Sequelize, type) => {
  var Itinerary = Sequelize.define('Itinerary', {
    name: type.STRING,
    description: type.STRING,
    photoUrl: type.STRING
  });

  Itinerary.associate = function(models) {
    Itinerary.hasMany(models.ItinerariesComment);
    Itinerary.belongsToMany(models.Stop, {through: 'ItineraryStops'});
    // Itinerary.belongsToMany(models.User, {through: 'Favorites'});
    Itinerary.belongsTo(models.User);
  };

  return Itinerary;
};
