const express = require('express');
const { getCheckoutSession } = require('../controller/bookingController');
const { protect, restrictTo } = require('../controller/authController');

const router = express.Router();

router.get('/checkout/:tourId', protect, getCheckoutSession);

module.exports = router;
