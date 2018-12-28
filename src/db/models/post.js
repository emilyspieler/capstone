'use strict';
module.exports = (sequelize, DataTypes) => {
  var Post = sequelize.define('Post', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    zipcode: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    spaceId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
  }, {});
  Post.associate = function(models) {
    // associations can be defined here
    Post.belongsTo(models.Space, {
       foreignKey: "spaceId",
       onDelete: "CASCADE"
     });

     Post.belongsTo(models.User, {
       foreignKey: "userId",
       onDelete: "CASCADE"
      });

    Post.belongsTo(models.Space, {
      foreignKey: "spaceId",
      onDelete: "CASCADE"
    });
  };
  return Post;
};
