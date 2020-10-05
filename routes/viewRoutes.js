const express = require('express');
const { getOverview, getTour, getLoginForm } = require('../controller/viewsController');
const { isLoggedIn } = require('../controller/authController');

const router = express.Router();

router.use(isLoggedIn);

router.get('/', getOverview);
router.get('/tours/:tourName', getTour);
router.get('/login', getLoginForm);

module.exports = router;
