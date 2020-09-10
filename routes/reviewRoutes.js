const express = require('express');
const {
  getAllReviews,
  getReview,
  updateReview,
  deleteReview,
  createReview,
  setTourUserIds,
} = require('../controller/reviewController');
const { protect, restrictTo } = require('../controller/authController');

const router = express.Router({ mergeParams: true });
router
  .route('/')
  .get(getAllReviews)
  .post(protect, restrictTo('user'), setTourUserIds, createReview);
router
  .route('/:id')
  .get(getReview)
  .patch(updateReview)
  .delete(protect, deleteReview);

module.exports = router;
