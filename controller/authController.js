const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('./../model/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const signToken = id => {
  return jwt.sign(
    {
      id,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN },
  );
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const token = signToken(newUser._id);
  
  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // check if email and password actually exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }

  // check if the user exists and password correct
  const user = await User.findOne({ email }).select('+password'); // +password since select is false on the User model

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Invalid email or password', 401));
  }

  // if everything okay send the token to the client
  const token = signToken(user._id);
  res.status(200).json({
    status: 'success',
    token,
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  // getting token
  let token;
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if(!token) {
    return next(new AppError('You are not logged in', 401));
  }
  // verification of token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  
  // check if the user trying access the route still exists
  const foundUser = await User.findById(decoded.id);
  if (!foundUser) {
    return next(new AppError('The user does not exist', 401));
  }

  // check if the user password was changed after JWT was issued
  foundUser.changedPasswordAfter(decoded.iat);

  next();
});