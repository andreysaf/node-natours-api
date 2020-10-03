const Tour = require('../model/tourModel');
const catchAsync = require('../utils/catchAsync');

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

exports.getTour = catchAsync(async (req, res) => {
  // get the data for the requested tour (including reviews, tour guides and tour)
  const tour = await Tour.findOne({ slug: req.params.tourName }).populate({
    path: 'reviews',
    fields: 'review rating user'
  });

  // build the template
  // render the template and send it back
  res.status(200).render('tour', {
    title: tour.name,
    tour
  });
});
