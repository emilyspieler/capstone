const spaceQueries = require("../db/queries.spaces.js");
const Space = require('../db/models').Space;
const Authorizer = require("../policies/spaces");

module.exports = {
  index(req, res, next){
    spaceQueries.getAllSpaces((err, spaces) => {
        if(err){
          res.redirect(500, "static/index");
        } else {
          res.render("spaces/index", {spaces});
        }
      })
  },

  new(req, res, next){

       const authorized = new Authorizer(req.user).new();

         if(authorized) {
               res.render("spaces/new");
             } else {
               req.flash("notice", "You are not authorized to do that.");
               res.redirect("/spaces");
             }
           },

  create(req, res, next){
     let newSpace = {
       title: req.body.title,
       description: req.body.description
     };
     spaceQueries.addSpace(newSpace, (err, space) => {
       if(err){
         res.redirect(500, "/spaces/new");
       } else {
         res.redirect(303, `/spaces/${space.id}`);
       }
     });
   },

   show(req, res, next){

      spaceQueries.getSpace(req.params.id, (err, space) => {

        if(err || space == null){
          res.redirect(404, "/");
        } else {
          res.render("spaces/show", {space});
        }
      });
    },

    destroy(req, res, next){
       spaceQueries.deleteSpace(req.params.id, (err, space) => {
         if(err){
           res.redirect(500, `/spaces/${space.id}`)
         } else {
           res.redirect(303, "/spaces")
         }
       });
     },

     edit(req, res, next){

      topicQueries.getTopic(req.params.id, (err, topic) => {
        if(err || topic == null){
          res.redirect(404, "/");
        } else {

          const authorized = new Authorizer(req.user, space).edit();

          if(authorized){
            res.render("spaces/edit", {space});
          } else {
            req.flash("You are not authorized to do that.")
            res.redirect(`/spaces/${req.params.id}`)
          }
        }
      });
    },

     update(req, res, next){

      spaceQueries.updateSpace(req.params.id, req.body, (err, space) => {

        if(err || space == null){
          res.redirect(404, `/spaces/${req.params.id}/edit`);
        } else {
          res.redirect(`/spaces/${space.id}`);
        }
      });
    }

}
