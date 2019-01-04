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
      type: DataTypes.BIGINT,
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

     Post.hasOne(models.Space, {
        foreignKey: "postId",
        as: "spaces"
      });

     Post.belongsTo(models.User, {
       foreignKey: "userId",
       onDelete: "CASCADE"
      });

      Post.hasMany(models.Comment, {
      foreignKey: "postId",
      as: "comments"
    });

  };
  return Post;
};
