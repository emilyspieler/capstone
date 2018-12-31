'use strict';
module.exports = (sequelize, DataTypes) => {
  var Zipcode = sequelize.define('Zipcode', {
    body: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  Zipcode.associate = function(models) {
    // associations can be defined here
  };
  return Zipcode;
};
