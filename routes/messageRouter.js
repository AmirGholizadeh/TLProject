const express = require('express');
const messageController = require('./../controllers/messageController');
const authController = require('./../controllers/authController');
const router = express.Router();
router.use(authController.protect, authController.restrictTo('manager'));
router.route('/').get(messageController.getMessages).post(messageController.createMessage);
module.exports = router;