const Space = require("./models").Space;
const Post = require("./models").Post;
const Authorizer = require("../policies/spaces");

module.exports = {

  getAllSpaces(callback){
    return Space.all()
    .then((spaces) => {
      callback(null, spaces);
    })
    .catch((err) => {
      callback(err);
    })
  },

  addSpace(newSpace, callback){
      return Space.create({
        title: newSpace.title,
        description: newSpace.description
      })
      .then((space) => {
        callback(null, space);
      })
      .catch((err) => {
        callback(err);
      })
    },

    getSpace(id, callback){
      return Space.findById(id, {
      include: [{
        model: Post,
        as: "posts"
      }]
    })
      .then((space) => {
        callback(null, space);
      })
      .catch((err) => {
        callback(err);
      })
    },

    deleteSpace(id, callback){
     return Space.destroy({
       where: {id}
     })
     .then((space) => {
       callback(null, space);
     })
     .catch((err) => {
       callback(err);
     })
   },

   updateSpace(req, updatedSpace, callback){

     return Space.findById(req.params.id)
     .then((space) => {

       if(!space){
         return callback("Space not found");
       }

       const authorized = new Authorizer(req.user, space).update();

       if(authorized) {

         space.update(updatedSpace, {
           fields: Object.keys(updatedSpace)
         })
         .then(() => {
           callback(null, space);
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
