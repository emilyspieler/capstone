'use strict';
module.exports = (sequelize, DataTypes) => {
  const Space = sequelize.define('Space', {
    title: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  Space.associate = function(models) {
    // associations can be defined here
    Space.hasMany(models.Banner, {
    foreignKey: "spaceId",
    as: "banners",
  });
  };
  return Space;
};
