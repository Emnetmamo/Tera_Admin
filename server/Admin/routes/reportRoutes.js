const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

// Route to fetch daily reports
router.get('/allDailyReports', reportController.getAllDailyReports);



module.exports = router;
