const express = require("express");
const { searchRoomController } = require("../controller/roomController/searchRoomController");

const router = express.Router();

router.get("/", searchRoomController);

module.exports = router;
