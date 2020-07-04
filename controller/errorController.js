const AppError = require("../utils/appError");

const handleCastErrorDB = (err) => {
    const message = `Invalid ${err.path}: ${err.value}`;
    return new AppError(message, 400);
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
        sendErrorInProd(error, res);
    }
};