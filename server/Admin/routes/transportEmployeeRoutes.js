//routes/transportEmployeeRoutes.js

const express = require('express');
const router = express.Router();
const transportEmployeeController = require('../controllers/transportEmployeeController');

// transport EmployeeRoutes registration route
router.post('/register', transportEmployeeController.registerTransportEmployees)

module.exports = router;
