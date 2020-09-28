const express = require('express');
const { getOverview, getTour } = require('../controller/viewsController');

const router = express.Router();

router.get('/', getOverview);
router.get('/tour', getTour);

module.exports = router;
