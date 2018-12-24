const express = require("express");
const router = express.Router();
const staticController = require("../controllers/staticController");
const spaceController = require("../controllers/spaceController");

router.get("/", staticController.index);

module.exports = router;
