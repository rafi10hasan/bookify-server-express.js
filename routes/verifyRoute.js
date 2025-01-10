const express = require('express');
const { emailVerifyController } = require('../controller/emailVerifyController/emailVerifyController');
const { otpVerifyController } = require('../controller/otpVerifyController/otpVerifyController');
const router = express.Router();

router.post('/email',emailVerifyController)
router.post('/OTP/:id',otpVerifyController)
module.exports = router