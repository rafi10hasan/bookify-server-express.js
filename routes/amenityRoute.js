
const express = require('express');
const { amenityController } = require('../controller/amenityController/amenityController');
const router = express.Router();


router.get('',amenityController);

module.exports = router