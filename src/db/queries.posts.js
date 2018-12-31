const Post = require("./models").Post;
const Space = require("./models").Space;
const Zipcode = require("./models").Zipcode;
const Authorizer = require("../policies/spaces");
const Sequelize = require('sequelize')
const Op = Sequelize.Op;

module.exports = {

  addPost(newPost, callback){
     return Post.create(newPost)
     .then((post) => {
       callback(null, post);
     })
     .catch((err) => {
       callback(err);
     })
   },

   addZipcode(newZipcode, callback){
      return Zipcode.create(newZipcode)
      .then((zipcode) => {
        callback(null, zipcode);
      })
      .catch((err) => {
        callback(err);
      })
    },

   getPost(id, callback){
       return Post.findById(id)
       .then((post) => {
         callback(null, post);
       })
       .catch((err) => {
         callback(err);
       })
     },

     deletePost(id, callback){
     return Post.destroy({
       where: { id }
     })
     .then((deletedRecordsCount) => {
       callback(null, deletedRecordsCount);
     })
     .catch((err) => {
       callback(err);
     })
   },

   updatePost(req, updatedPost, callback){

          return Post.findById(req.params.id)
            .then((post) => {

            if(!post){
            return callback("Post not found");
            }

        const authorized = new Authorizer(req.user, post).update();


          if(authorized) {

            post.update(updatedPost, {
              fields: Object.keys(updatedPost)
            })
            .then(() => {
              callback(null, post);
            })
            .catch((err) => {
              callback(err);
            });
          } else {

            req.flash("notice", "You are not authorized to do that.");
            callback("Forbidden");
          }
        });
      }
}
