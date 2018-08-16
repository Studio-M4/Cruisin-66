'use strict';
module.exports = (Sequelize, type) => {
  var StopPhoto = Sequelize.define('StopPhoto', {
    url: type.STRING,
    description: type.STRING,
  });

  StopPhoto.associate = function(models) {
  };

  return StopPhoto;
};

