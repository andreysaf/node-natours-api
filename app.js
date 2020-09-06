const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const userRouter = require('./routes/userRoutes');
const tourRouter = require('./routes/tourRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controller/errorController');

const app = express();
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour'
});

app.use('/api', limiter);

app.use(express.json());

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// runs for get, post, update and so on
app.all('*', (req, res, next) => {
    next(new AppError(`Cannot resolve the ${req.originalUrl} on this server.`, 404));
});

// error handling middleware
app.use(globalErrorHandler);

module.exports = app;
