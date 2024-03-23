const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');

// Route to get assigned drivers form an employee
router.get('/assignedDrivers/:userId', attendanceController.getAssignedDrivers);
// Route to get drivers with an attendance data of the current day
router.get('/attendanceData/:userId', attendanceController.getAttendanceData);
// Route to mark attendance for drivers that dont have any record
router.post('/driversAttendance', attendanceController.postDriversAttendance);
// Route to update attendance for a specific driver
router.put('/driversAttendance/:driverId', attendanceController.updateDriversAttendance);

module.exports = router;
