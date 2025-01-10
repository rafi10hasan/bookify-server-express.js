const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { roomsController } = require('../controller/roomController/roomsController');
const { singleRoomController } = require('../controller/roomController/singleRoomController');
const { roomListController } = require('../controller/roomController/roomListController');
const addRoomController = require('../controller/roomController/addRoomController');
const upload = require('../lib/file-upload/upload');
const deleteRoomController = require('../controller/roomController/deleteRoomController');

const router = express.Router()

router.get('/all/:categoryId',authMiddleware,roomsController);
router.get('/roomlist',roomListController);
router.get('/:roomId',singleRoomController);
router.post('/add',upload.fields([{ name: "image" }, { name: "gallery" }]) ,addRoomController)
router.delete('/delete/:id',deleteRoomController)
module.exports = router