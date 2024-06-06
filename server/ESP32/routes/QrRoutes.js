const express = require('express');
const router = express.Router();
const { getDriverAttendanceByLicensePlate } = require('../Controller/QrController');

// Define the route to get driver attendance by license plate
router.get('/RoundQrCodes', getDriverAttendanceByLicensePlate);

module.exports = router;
