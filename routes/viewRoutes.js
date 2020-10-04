const express = require('express');
const { getOverview, getTour, getLoginForm } = require('../controller/viewsController');
const { protect } = require('../controller/authController');

const router = express.Router();

router.get('/', getOverview);
router.get('/tours/:tourName', protect, getTour);
router.get('/login', getLoginForm);

module.exports = router;
