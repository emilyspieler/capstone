const express = require("express");
const router = express.Router();

const flagController = require("../controllers/flagController");

router.post("/spaces/:spaceId/posts/:postId/flags/create",
  flagController.create);

router.post("/spaces/:spaceId/posts/:postId/flags/:id/destroy",
  flagController.destroy);

module.exports = router;
