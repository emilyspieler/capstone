'use strict';
module.exports = (sequelize, DataTypes) => {
  var Flag = sequelize.define('Flag', {
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Flag.associate = function(models) {
    // associations can be defined here
    Flag.belongsTo(models.Post, {
      foreignKey: "postId",
      onDelete: "CASCADE"
    });

    Flag.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE"
    });
  };
  return Flag;
};
