const express = require('express');
const { aliasTopTours, getTourStats, getMonthlyPlan, createTour, getAllTours, getTour, updateTour, deleteTour } = require('../controller/tourController');
const { protect, restrictTo } = require('../controller/authController');

const router = express.Router();
router.route('/tour-stats').get(getTourStats);
router.route('/monthly-plan/:year').get(getMonthlyPlan);
router.route('/top-5-tours').get(aliasTopTours, getAllTours);
router.route('/').get(protect, getAllTours).post(createTour);
router.route('/:id').get(getTour).patch(updateTour).delete(protect, restrictTo('admin', 'lead-guide'), deleteTour);

module.exports = router;