const express = require('express');
const { registerController } = require('../controller/authController/registerController');
const signInController = require('../controller/authController/signInController');

const router = express.Router()

router.post('/signup',registerController);
router.post('/signin',signInController);
module.exports = router