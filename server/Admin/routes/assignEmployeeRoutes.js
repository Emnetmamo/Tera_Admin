//routes/assignEmployeeRoutes.js

const express = require('express');
const router = express.Router();
const assignEmployeeController = require('../controllers/assignEmployeeController');

router.get('/TransportEmployeeData', assignEmployeeController.getTransportEmployeesByCityDistrict);
router.post('/assign', assignEmployeeController.assignTransportEmployee);


module.exports = router;
