const Tour = require('../model/tourModel');
const User = require('../model/userModel');
const Booking = require('../model/bookingModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getOverview = catchAsync(async (req, res) => {
  // get tour data
  const tours = await Tour.find();

  // build template
  // render the template and send it back
  res.status(200).render('overview', {
    title: 'All Tours',
    tours
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  // get the data for the requested tour (including reviews, tour guides and tour)
  const tour = await Tour.findOne({ slug: req.params.tourName }).populate({
    path: 'reviews',
    fields: 'review rating user'
  });

  if (!tour) {
    return next(new AppError('There is no tour with that name', 404));
  }

  // build the template
  // render the template and send it back
  res.status(200).render('tour', {
    title: tour.name,
    tour
  });
});

exports.getLoginForm = (req, res) => {
  // build template
  // render the template and send it back
  res.status(200).render('login', {
    title: 'Login'
  });
};

exports.getSignupForm = (req, res) => {
  // build template
  // render the template and send it back
  res.status(200).render('signup', {
    title: 'Sign up'
  });
};

exports.getAccount = (req, res) => {
  // build template
  // render the template and send it back
  res.status(200).render('account', {
    title: 'Account'
  });
};

exports.updateUserData = catchAsync(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.user.id, {
    name: req.body.name,
    email: req.body.email
  }, {
    new: true,
    runValidators: true
  });

  // render the template and send it back
  res.status(200).render('account', {
    title: 'Account',
    user
  });
});

exports.getMyTours = catchAsync(async (req, res, next) => {
  // find all bookings
  const bookings = await Booking.find({
    user: req.user.id
  });

  // find tours with the returned IDs
  const tourIds = bookings.map(el => el.tour.id);
  const tours = await Tour.find({ _id: { $in: tourIds} });

  res.status(200).render('overview', {
    title: 'My Tours',
    tours
  });
});