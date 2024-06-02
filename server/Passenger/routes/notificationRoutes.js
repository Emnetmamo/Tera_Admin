// routes/notificationRoutes.js

const express = require('express');
const router = express.Router();
const notificationController = require('../controller/notificationController');

// Route to fetch notifications
router.get('/', notificationController.getNotifications);
router.get('/count', notificationController.getNewNotification);

module.exports = router;
