const express = require('express');
const { addReviewController } = require('../controller/reviewController/addReviewController');
const { reviewListController } = require('../controller/reviewController/reviewListController');
const router = express.Router();


router.get('',reviewListController)
router.post('/add',addReviewController);

module.exports = router