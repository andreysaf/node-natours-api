const express = require('express');
const { createTour } = require('../controller/tourController');

const router = express.Router();
router.route('/').post(createTour);
router.route('/:id');

module.exports = router;