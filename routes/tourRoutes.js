const express = require('express');
const {
  aliasTopTours,
  getTourStats,
  getMonthlyPlan,
  createTour,
  getAllTours,
  getTour,
  updateTour,
  deleteTour,
  getToursWithin,
} = require('../controller/tourController');
const { protect, restrictTo } = require('../controller/authController');
const reviewRouter = require('./reviewRoutes');

const router = express.Router();
router.use('/:tourId/reviews', reviewRouter);
router.route('/tour-stats').get(getTourStats);
router.route('/monthly-plan/:year').get(protect, restrictTo('admin', 'guide', 'lead-guide'), getMonthlyPlan);
router.route('/top-5-tours').get(aliasTopTours, getAllTours);

router.route('/tours-within/:distance/center/:latlng/unit/:unit').get(getToursWithin);

router.route('/').get(getAllTours).post(protect, restrictTo('admin', 'lead-guide'), createTour);
router
  .route('/:id')
  .get(getTour)
  .patch(protect, restrictTo('admin', 'lead-guide'), updateTour)
  .delete(protect, restrictTo('admin', 'lead-guide'), deleteTour);

module.exports = router;
