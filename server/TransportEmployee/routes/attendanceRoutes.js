const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');

// Route to get Employee Terminal info
router.get('/employeeTerminal/:userId', attendanceController.getEmployeeTerminal);
// Route to get assigned drivers for an employee
router.get('/assignedDrivers/:userId', attendanceController.getAssignedDrivers);
// Route to get drivers with attendance data for the current day
router.get('/attendanceData/:userId', attendanceController.getAttendanceData);
// Route to mark attendance for drivers that don't have any record
router.post('/driversAttendance', attendanceController.postDriversAttendance);
// Route to update attendance for a specific driver
router.put('/driversAttendance/:driverId', attendanceController.updateDriversAttendance);
// Route to get QR codes for rounds
// router.get('/qrCodes/:userId/:driverId/:roundIndex', attendanceController.getQRCode);

router.get('/driverAttendance/:driverId', attendanceController.getDriverAttendance);

module.exports = router;
