const Space = require("./models").Space;
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
      return Space.findById(id)
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

   updateSpace(id, updatedSpace, callback){
     return Space.findById(id)
     .then((space) => {
       if(!space){
         return callback("Space not found");
       }

       space.update(updatedSpace, {
         fields: Object.keys(updatedSpace)
       })
       .then(() => {
         callback(null, space);
       })
       .catch((err) => {
         callback(err);
       });
     });
   }

}
