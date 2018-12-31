const express = require("express");
const router = express.Router();

const postController = require("../controllers/postController");

router.get("/spaces/:spaceId/posts/new", postController.new);
router.post("/spaces/:spaceId/posts/create", postController.create);

router.get("/spaces/:spaceId/posts/new_zipcode", postController.new_zipcode);
router.post("/spaces/create_zipcode", postController.create_zipcode);

router.get("/spaces/:spaceId/posts/:id", postController.show);
router.post("/spaces/:spaceId/posts/:id/destroy", postController.destroy);
router.get("/spaces/:spaceId/posts/:id/edit", postController.edit);
router.post("/spaces/:spaceId/posts/:id/update", postController.update);

module.exports = router;
