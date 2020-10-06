const express = require('express');
const { getAllUsers, createUser, getUser, updateUser, deleteUser, updateMe, deleteMe, getMe } = require('../controller/userController');
const { signup, login, logout, protect, forgotPassword, resetPassword, updatePassword, restrictTo } = require('../controller/authController');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);
router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);


// protect all routes after the middleware
router.use(protect);

router.patch('/updateMyPassword', updatePassword);
router.patch('/updateMe', updateMe);
router.delete('/deleteMe', deleteMe);
router.get('/me', getMe, getUser);

// restrict all routes after the middleware
router.use(restrictTo('admin'));

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
