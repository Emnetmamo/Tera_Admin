const express = require('express');
const router = express.Router();
const dailyReportController = require('../controllers/dailyReportController');

// Route to get assigned drivers form an employee
router.get('/assignedDrivers/:userId', dailyReportController.getAssignedDrivers);

// Route to get attendance record for a specific driver
router.get('/attendanceRecord/:driverId', dailyReportController.getAttendanceRecord);

// Route to get punishments sent for a specific driver
router.get('/punishmentsSent/:driverId', dailyReportController.getPunishmentsSent);

// Route to get warnings sent for a specific driver
router.get('/warningsSent/:driverId', dailyReportController.getWarningsSent);

// Route to post report 
router.post('/submit', dailyReportController.submitDailyReport);

// Route to check if a report has been submitted for today
router.get('/checkReport/:driverId', dailyReportController.checkReportExistence ) ;


module.exports = router;
