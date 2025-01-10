const express = require('express');
const { checkRoomController } = require('../controller/roomController/checkRoomController');
const router = express.Router();

router.post('/availability',checkRoomController)
module.exports = router