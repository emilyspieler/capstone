const spaceQueries = require("../db/queries.spaces.js");
const Space = require('../db/models').Space;

module.exports = {
  index(req, res, next){
    spaceQueries.getAllSpaces((err, spaces) => {
        if(err){
          console.log(err)
          res.redirect(500, "static/index");
        } else {
          res.render("spaces/index", {spaces});
        }
      })
  }
}
