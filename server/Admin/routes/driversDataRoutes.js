// routes/driversDataRoutes.js

const express = require('express');
const router = express.Router();
const driversDataController = require('../controllers/driversDataController');
// path to get all drivers
router.get('/getTaxiDriversData', driversDataController.getDrivers);
// path to get new drivers with no assigned employee
router.get('/getNewTaxiDriversData', driversDataController.getNewDrivers);
// path to get  drivers with  assigned employee
router.get('/getAssignedDrivers', driversDataController.getAssignedDrivers);

module.exports = router;
