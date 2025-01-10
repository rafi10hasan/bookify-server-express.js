const express = require('express');
const { accommodationListController } = require('../controller/accommodationController/accommodationListController');
const { updateAccController } = require('../controller/accommodationController/updateAccommodationController');
const router = express.Router();

router.get('/',accommodationListController);
router.patch('/:id',updateAccController)
module.exports = router