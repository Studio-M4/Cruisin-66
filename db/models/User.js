'use strict';
module.exports = (Sequelize, type) => {
  var User = Sequelize.define('User', {
    userName: {
      type: type.STRING, 
      allowNull: false
    }, 
    firstName: type.STRING, 
    lastName: type.STRING,
    email: {
      type: type.STRING, 
      allowNull: false
    }, 
    password: {
      type: type.STRING, 
      allowNull: false
    },
    photoAvatar: type.STRING
  });

  User.associate = (models) => {
    User.belongsToMany(models.Category, {through: 'userInterests'});
    User.hasMany(models.Itinerary)
    User.hasMany(models.ItinerariesComment)
    User.hasMany(models.StopsComment)
    User.belongsToMany(models.Itinerary, {through: 'Favorites'});
  };
  
  // User.sync();
  return User;
};
