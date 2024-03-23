//routes/employeeDataRoutes.js


// All Transport Employees datas
const express = require('express');
const router = express.Router();
const employeeDataController = require('../controllers/employeeDataController');

router.get('/getTransportEmployeeData', employeeDataController.getTransportEmployees)

module.exports = router;