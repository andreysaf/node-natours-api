const express = require('express');
const {
  getAllReviews,
  getReview,
  updateReview,
  deleteReview,
  createReview,
} = require('../controller/reviewController');
const { protect, restrictTo } = require('../controller/authController');

const router = express.Router({ mergeParams: true });
router
  .route('/')
  .get(getAllReviews)
  .post(protect, restrictTo('user'), createReview);
router
  .route('/:id')
  .get(getReview)
  .patch(updateReview)
  .delete(protect, deleteReview);

module.exports = router;
