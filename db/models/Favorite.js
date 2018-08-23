'use strict';
module.exports = (Sequelize, type) => {
  var Favorite = Sequelize.define('Favorite', {
    // fav_id: {
    //   type: type.INTEGER,      
    //   primaryKey: true,
    //   autoIncrement: true
    // }
       ItineraryId: {
         type: type.INTEGER
       },
       UserId: {
         type: type.INTEGER
       }
  });

  Favorite.associate = function(models) {
  };

  Favorite.removeAttribute('id')

  return Favorite;
};
