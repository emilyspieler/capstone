const express = require("express");
const router = express.Router();
const Post = require("../db/models").Post;
const models = require( '../db/models/index');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const postQueries = require("../db/queries.posts.js");

const postController = require("../controllers/postController");

router.get("/spaces/:spaceId/posts/new", postController.new);
router.post("/spaces/:spaceId/posts/create", postController.create);
router.get("/spaces/:spaceId/posts/:id", postController.show);
router.post("/spaces/:spaceId/posts/:id/destroy", postController.destroy);
router.get("/spaces/:spaceId/posts/:id/edit", postController.edit);
router.post("/spaces/:spaceId/posts/:id/update", postController.update);


router.get('/search', (req, res) => {
  let { posts } = req.query;

  models.Post.findAll({ where: { zipcode: posts } })

    .then(posts => res.render('posts/show', { posts }))
    .catch(err => console.log(err));
});


module.exports = router;
