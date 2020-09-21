const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const helmet = require('helmet');
const userRouter = require('./routes/userRoutes');
const tourRouter = require('./routes/tourRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controller/errorController');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
// serving static files
app.use(express.static(path.join(__dirname, 'public')));

// set security http headers
app.use(helmet());

// development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// limit requests from the same IP
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour',
});
app.use('/api', limiter);

// body parser
app.use(express.json({ limit: '10kb' }));

// data sanitization against NoSQL query injection
app.use(mongoSanitize());

// data sanitization against XSS
app.use(xss());

// prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  }),
);

// routes

app.get('/', (req, res) => {
  res.status(200).render('base', {
    tour: 'The Forest Hiker',
    user: 'Andrey'
  });
});
app.get('/overview', (req, res) => {
  res.status(200).render('overview', {
    title: 'All Tours'
  });
});
app.get('/tour', (req, res) => {
  res.status(200).render('tour', {
    title: 'The Forest Hiker'
  });
});
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);

// runs for get, post, update and so on
app.all('*', (req, res, next) => {
  next(
    new AppError(`Cannot resolve the ${req.originalUrl} on this server.`, 404),
  );
});

// error handling middleware
app.use(globalErrorHandler);

module.exports = app;
