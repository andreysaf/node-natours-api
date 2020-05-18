const express = require('express');
const { createTour, getAllTours, getTour, updateTour } = require('../controller/tourController');

const router = express.Router();
router.route('/').get(getAllTours).post(createTour);
router.route('/:id').get(getTour).patch(updateTour);

module.exports = router;