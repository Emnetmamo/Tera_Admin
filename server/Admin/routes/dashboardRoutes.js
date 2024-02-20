const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

// Dashboard data route
router.get('/dashboard-data/:userId', dashboardController.getDashboardData);

module.exports = router;