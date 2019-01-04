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

    Post.hasMany(models.Flag, {
     foreignKey: "postId",
     as: "flags"
   });

   Post.prototype.getFlagFor = function(userId){
     return this.flags.find((flag) => { return flag.userId == userId });
   };

   Post.afterCreate((post, callback) => {
     return models.Flag.create({
       userId: post.userId,
       postId: post.id
     });
   });

  };
  return Post;
};
