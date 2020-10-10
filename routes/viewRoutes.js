const express = require('express');
const { getOverview, getTour, getLoginForm, getAccount, updateUserData } = require('../controller/viewsController');
const { isLoggedIn, protect } = require('../controller/authController');

const router = express.Router();

router.get('/', isLoggedIn,  getOverview);
router.get('/tours/:tourName', isLoggedIn, getTour);
router.get('/login', isLoggedIn, getLoginForm);
router.get('/me', protect, getAccount);

router.post('/submit-user-data', protect, updateUserData);

module.exports = router;
