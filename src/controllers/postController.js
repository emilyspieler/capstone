const postQueries = require("../db/queries.posts.js");
const Authorizer = require("../policies/post");
const Space = require('../db/models').Space;

module.exports = {

new(req, res, next){

  const authorized = new Authorizer(req.user).new();

     if(authorized) {
       res.render("posts/new", {spaceId: req.params.spaceId});

    } else {
       req.flash("notice", "You are not authorized to do that.");
       res.redirect("/spaces");
     }
  },


   create(req, res, next){

     const authorized = new Authorizer(req.user).create();

     if(authorized) {
      let newPost= {
        title: req.body.title,
        body: req.body.body,
        description: req.body.description,
        zipcode: req.body.zipcode,
        spaceId: req.params.spaceId,
        userId: req.user.id
      };
      postQueries.addPost(newPost, (err, post) => {
        if(err){
        console.log(err);
          res.redirect(500, "/posts/new");
        } else {
          res.redirect(303, `/spaces/${newPost.spaceId}`);
        }
      });
        } else {
       req.flash("notice", "You are not authorized to do that.");
       res.redirect("/spaces");
     }
    },

   show(req, res, next){
     postQueries.getPost(req.params.id, (err, post) => {
       if(err || post == null){
         console.log(err);
         res.redirect(404, "/");
       } else {
         res.render("posts/show", {post});
       }
     });
   },

   destroy(req, res, next){
     postQueries.deletePost(req.params.id, (err, deletedRecordsCount) => {
       if(err){
         console.log(err);
         res.redirect(err, `/spaces/${req.params.spaceId}/posts/${req.params.id}`)
       } else {
          res.redirect("/spaces")
       }
     });
   },

   edit(req, res, next){
    postQueries.getPost(req.params.id, (err, post) => {
      if(err || post == null){
        console.log(err);
        res.redirect(404, "/");
      } else {

    const authorized = new Authorizer(req.user, post).edit();

    if(authorized){
           res.render("posts/edit", {post});
         } else {
           req.flash("You are not authorized to do that.")
           res.redirect(`/spaces/${req.params.spacesId}/posts/${req.params.id}`)
         }
       }
     });
  },

  update(req, res, next){
     postQueries.updatePost(req, req.body, (err, post) => {
       if(err || post == null){
         res.redirect(401, `/spaces/${req.params.spacesId}/posts/${req.params.id}/edit`);
       } else {
         res.redirect(`/spaces/${req.params.spaceId}/posts/${req.params.id}`);
       }
     });
   }

}
