const express = require('express');
const { bookingCheckController } = require('../controller/bookingController/bookingCheckController');
const { getBookingsController } = require('../controller/bookingController/getBookingsController');
const allBookingController = require('../controller/bookingController/allBookingController');
const { pastAndUpcomingController } = require('../controller/bookingController/pastAndUpcomingController');




const router = express.Router();

router.get("/verify-purchase-room/:userId/:roomId",bookingCheckController);
router.get("/mybookings/:id",getBookingsController);
router.get("/all",allBookingController);
router.get("/history/:id",pastAndUpcomingController)
module.exports = router