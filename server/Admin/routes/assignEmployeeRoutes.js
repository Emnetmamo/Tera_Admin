//routes/assignEmployeeRoutes.js

const express = require('express');
const router = express.Router();
const assignEmployeeController = require('../controllers/assignEmployeeController');

router.get('/TransportEmployeeData', assignEmployeeController.getTransportEmployees);
router.post('/assignTransportEmployee', assignEmployeeController.assignTransportEmployee);

module.exports = router;
