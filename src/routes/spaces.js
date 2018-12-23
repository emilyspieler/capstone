const express = require("express");
const router = express.Router();

const spaceController = require("../controllers/spaceController")

router.get("/spaces", spaceController.index);
router.get("/spaces/new", spaceController.new);
router.post("/spaces/create", spaceController.create);
router.get("/spaces/:id", spaceController.show);
router.post("/spaces/:id/destroy", spaceController.destroy);
router.get("/spaces/:id/edit", spaceController.edit);
router.post("/spaces/:id/update", spaceController.update);

module.exports = router;
