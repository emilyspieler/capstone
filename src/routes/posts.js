const express = require("express");
const router = express.Router();
const Post = require("../db/models").Post;
const Space = require("../db/models").Space;
const models = require( '../db/models/index');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const postQueries = require("../db/queries.posts.js");
const spaceQueries = require("../db/queries.spaces.js");
const validation = require("./validation");
const helper = require("../auth/helpers");

const postController = require("../controllers/postController");

router.get("/spaces/:spaceId/posts/new", postController.new);
router.get("/spaces/:spaceId/posts/new_navbar", postController.new);
router.post("/spaces/:spaceId/posts/create", helper.ensureAuthenticated,
   validation.validatePosts, postController.create);
router.get("/spaces/:spaceId/posts/:id", postController.show);
router.post("/spaces/:spaceId/posts/:id/destroy", postController.destroy);
router.get("/spaces/:spaceId/posts/:id/edit", postController.edit);
router.post("/spaces/:spaceId/posts/:id/update", validation.validatePosts, postController.update);
router.get('/search', postController.show_search);

module.exports = router;
