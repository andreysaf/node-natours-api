const express = require('express');
const { getAllTours, getTour, checkBody, createTour } = require('../controller/tourController');

const router = express.Router();
router.route('/').get(getAllTours).post(checkBody, createTour);
router.route('/:id').get(getTour);

module.exports = router;