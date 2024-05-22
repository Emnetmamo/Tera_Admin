const express = require('express');
const router = express.Router();
const employeeComController = require('../controllers/employeeComController');

// Send a taxi to a new route 
router.post('/sendTaxi', employeeComController.sendTaxi);

// Report on an incident 
router.post('/reportIncident', employeeComController.reportIncident);

// Route to fetch received route change messages
router.get('/receivedRouteChangeMessages', employeeComController.fetchRouteChangeMessages);

// Route to fetch received incident messages
router.get('/receivedIncidentMessages', employeeComController.fetchIncidentMessages);

module.exports = router;
