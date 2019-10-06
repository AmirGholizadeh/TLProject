const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');
const router = express.Router();


router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.patch('/updateMyPassword', authController.protect, authController.updatePassword);
router.patch('/updateMyInfo', authController.protect, userController.updateInfo);
router.use(authController.protect, authController.restrictTo('manager'));
router.patch('/sendMessageAll', userController.sendMessageAll);

router.route('/').get(userController.getUsers).delete(userController.deleteUsers).post(userController.createUser);
router.route('/:id').get(userController.getUser).patch(userController.updateUser).delete(userController.deleteUser);
module.exports = router;