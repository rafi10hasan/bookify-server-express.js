const express = require("express");
const { ratingController } = require("../controller/ratingController/ratingController");
const { addRatingController } = require("../controller/ratingController/addRatingController");
const router = express.Router();

router.get("/:userId/:roomId", ratingController);
router.post("/add", addRatingController);
module.exports = router;
