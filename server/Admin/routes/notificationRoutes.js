const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/Notification');

// Route to send notifications
router.post('/sendNotification', notificationController.sendNotification);

module.exports = router;