const AppError = require("../utils/appError");

const handleCastErrorDB = (err) => {
    const message = `Invalid ${err.path}: ${err.value}`;
    return new AppError(message, 400);
}

const handleDuplicateFieldsDB = (err) => {
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/);
    const message = `Duplicate field value: ${value}. Please use another value.`;
    return new AppError(message, 400);
}

const handleJWTError = () => {
    return new AppError('Invalid token. Please login again', 401);
}

const TokenExpiredError = () => {
    return new AppError('Expired token. Please login again', 401);
}

const sendErrorInDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
    });
}

const sendErrorInProd = (err, res) => {
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    } else {
        console.log(`Error: ${err}`);
        res.status(500).json({
            status: 'error',
            message: 'Something went wrong',
        });
    }
}

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'fail';
    if (process.env.NODE_ENV==='development') {
        sendErrorInDev(err, res);
    } else if (process.env.NODE_ENV==='production') {
        let error = {...err};
        if (error.name === 'CastError') error = handleCastErrorDB(error)
        if (error.code === 11000) error = handleDuplicateFieldsDB(error)
        if (error.name === 'JsonWebTokenError') error = handleJWTError()
        if (error.name === 'TokenExpiredError') error = handleJWTExpiredError()
        sendErrorInProd(error, res);
    }
};