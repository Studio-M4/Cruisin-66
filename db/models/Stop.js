'use strict';
module.exports = (Sequelize, type) => {
  var Stop = Sequelize.define('Stop', {
    name: type.STRING,
    longitude: type.DOUBLE,
    latitude: type.DOUBLE,
    description: type.STRING,
    avgRating: type.FLOAT,
    address: type.STRING,
    zipCode: type.STRING,
    audioFile: type.STRING,
    order: type.INTEGER,
    photo: type.STRING //deprecated, now using StopPhotos
  });

  Stop.associate = function(models) {
    Stop.hasMany(models.StopsComment)
    Stop.hasMany(models.StopPhoto)
    Stop.belongsToMany(models.Itinerary, {through: 'ItineraryStops'});
  };

  return Stop;
};