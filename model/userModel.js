const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A user must have a name.'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'A user must have an email.'],
    unique: true,
    trim: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
    lowercase: true,
  },
  photo: {
    type: String,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false, // never want to return a password
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    validate: {
      // this will run on create and save
      validator: function(el) {
        return el === this.password;
      },
      message: 'Passwords do not match'
    }
  },
  passwordChangedAt: {
    type: Date
  }
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined; // do not want to persist this field and only keep one 

  next();
});

userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
}

userSchema.methods.changedPasswordAfter = function(JWTTimeStamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(this.passwordChangedAt.getTime()/1000, 10);
    return changedTimeStamp > JWTTimeStamp;
  }

  // false means that the password have not been changeds
  return false;
}

const User = mongoose.model('User', userSchema);

module.exports = User;
