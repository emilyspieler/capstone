const Comment = require("./models").Comment;
const Post = require("./models").Post;
const User = require("./models").User;
const Flag = require("./models").Flag;
const Authorizer = require("../policies/flag");

module.exports = {

  createFlag(req, callback){
    return Flag.create({
      postId: req.params.postId,
      userId: req.user.id
    })
    .then((flag) => {
      callback(null, flag);
    })
    .catch((err) => {
      callback(err);
    });
  },

  deleteFlag(req, callback){
    const id = req.params.id;

    return Flag.findById(id)
    .then((flag) => {

      if(!flag){
        return callback("Favorite not found");
      }

      const authorized = new Authorizer(req.user, flag).destroy();

      if(authorized){
        Flag.destroy({ where: { id }})
        .then((deletedRecordsCount) => {
          callback(null, deletedRecordsCount);
        })
        .catch((err) => {
          callback(err);
        });
      } else {
        req.flash("notice", "You are not authorized to do that.")
        callback(401);
      }
    })
    .catch((err) => {
      callback(err);
    });
  }
}
