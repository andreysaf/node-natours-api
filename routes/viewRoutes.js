const express = require('express');
const { getOverview, getTour, getLoginForm, getSignupForm, getAccount, updateUserData } = require('../controller/viewsController');
const { isLoggedIn, protect } = require('../controller/authController');
const { createBookingCheckout } = require('../controller/bookingController');

const router = express.Router();

router.get('/', createBookingCheckout, isLoggedIn,  getOverview);
router.get('/tours/:tourName', isLoggedIn, getTour);
router.get('/login', isLoggedIn, getLoginForm);
router.get('/signup', isLoggedIn, getSignupForm);
router.get('/me', protect, getAccount);

router.post('/submit-user-data', protect, updateUserData);

module.exports = router;
