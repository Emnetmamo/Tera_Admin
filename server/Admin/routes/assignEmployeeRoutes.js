//routes/assignEmployeeRoutes.js

const express = require('express');
const router = express.Router();
const assignEmployeeController = require('../controllers/assignEmployeeController');

// For Unassigned Drivers
router.get('/TransportEmployeeData', assignEmployeeController.getTransportEmployeesByCityDistrictAndTerminal);
router.post('/assign', assignEmployeeController.assignTransportEmployee);

// For Assigned Drivers

router.get('/getEmployeeExceptCurrent', assignEmployeeController.getEmployeeExceptCurrent);
router.post('/changeEmployee', assignEmployeeController.changeAssignedEmployee);
router.post('/changeroute',assignEmployeeController.changeAssignedRoute);

module.exports = router;
