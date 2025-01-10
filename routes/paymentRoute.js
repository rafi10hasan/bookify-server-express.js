const express = require('express');
const { paymentCheckoutController } = require('../controller/paymentController/paymentCheckoutController');
const { paymentVerifyController } = require('../controller/paymentController/paymentVerifyController');

const router = express.Router();

router.post('/create-checkout-session',paymentCheckoutController)
router.post('/verify-payment-intent',paymentVerifyController)

module.exports = router