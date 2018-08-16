'use strict';
module.exports = (Sequelize, type) => {
  var Itinerary = Sequelize.define('Itinerary', {
    name: type.STRING,
    description: type.STRING
  });

  Itinerary.associate = function(models) {
    Itinerary.hasMany(models.ItinerariesComment)
    Itinerary.belongsToMany(models.Stop, {through: 'ItineraryStops'});
    Itinerary.hasMany(models.ItineraryPhoto)
  };

  return Itinerary;
};
