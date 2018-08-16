'use strict';
module.exports = (Sequelize, type) => {
  var Category = Sequelize.define('Category', {
    name: type.STRING
  });

  Category.associate = function(models) {
    Category.hasMany(models.Itinerary)
    Category.belongsToMany(models.User, {through: 'userInterests'});
  };

  return Category;
}