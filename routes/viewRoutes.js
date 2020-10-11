const express = require('express');
const { getOverview, getTour, getLoginForm, getSignupForm, getAccount, updateUserData, getMyTours } = require('../controller/viewsController');
const { isLoggedIn, protect } = require('../controller/authController');


const router = express.Router();

router.get('/', isLoggedIn,  getOverview);
router.get('/tours/:tourName', isLoggedIn, getTour);
router.get('/login', isLoggedIn, getLoginForm);
router.get('/signup', isLoggedIn, getSignupForm);
router.get('/me', protect, getAccount);
router.get('/my-tours', protect, getMyTours);

router.post('/submit-user-data', protect, updateUserData);

module.exports = router;
