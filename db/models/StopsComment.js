'use strict';
module.exports = (Sequelize, type) => {
  var StopsComment = Sequelize.define('StopsComment', {
    text: type.STRING,
    rating: type.FLOAT,
  });

  StopsComment.associate = function(models) {
    StopsComment.belongsTo(models.User);
    StopsComment.belongsTo(models.Stop);
  };

  return StopsComment;
};
