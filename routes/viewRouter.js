const express = require('express');
const viewController = require('./../controllers/viewController');
const authController = require('./../controllers/authController');
const router = express.Router();

router.get('/', authController.protect, viewController.getHomepage);
router.get('/login', authController.isLoggedIn, viewController.getLoginForm);
router.get('/signup', authController.isLoggedIn, viewController.getSignupForm);

router.get('/users', authController.protect, authController.restrictTo('manager', 'admin'), viewController.getUsers);
router.get('/messages', authController.protect, viewController.getMessages);
router.get('/me', authController.protect, viewController.getMe);
module.exports = router;