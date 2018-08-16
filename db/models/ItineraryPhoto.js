'use strict';
module.exports = (Sequelize, type) => {
  var ItineraryPhoto = Sequelize.define('ItineraryPhoto', {
    url: type.STRING,
    description: type.STRING,
  });

  ItineraryPhoto.associate = function(models) {
  };

  return ItineraryPhoto;
};