const express = require('express');
const { getAllUsers, createUser, getUser, updateUser, deleteUser, updateMe, deleteMe, getMe } = require('../controller/userController');
const { signup, login, protect, forgotPassword, resetPassword, updatePassword } = require('../controller/authController');

const router = express.Router();


router.post('/signup', signup);
router.post('/login', login);
router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);
router.patch('/updateMyPassword', protect, updatePassword);
router.patch('/updateMe', protect, updateMe);
router.delete('/deleteMe', protect, deleteMe);
router.route('/').get(getAllUsers).post(createUser);
router.get('/me', protect, getMe, getUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);


module.exports = router;
